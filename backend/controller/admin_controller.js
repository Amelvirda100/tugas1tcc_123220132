import User from "../models/admin_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// GET USER
async function getUsers(req, res) {
  try {
    const admin = await User.findAll();

    // Kirim respons sukses (200)
    return res.status(200).json({
      status: "Success",
      message: "Users Retrieved",
      data: users, // <- Data seluruh user
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// GET USER BY ID
async function getUserById(req, res) {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });


    if (!user) {
      const error = new Error("Admin tidak ditemukan 😮");
      error.statusCode = 400;
      throw error;
    }

    return res.status(200).json({
      status: "Success",
      message: "User Retrieved",
      data: user, 
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// CREATE USER
async function createUser(req, res) {
  try {
    
    const { name, email, password } = req.body;

    if (Object.keys(req.body).length < 4) {
      const error = new Error("Field cannot be empty 😠");
      error.statusCode = 400;
      throw error;
    }

    
    const encryptPassword = await bcrypt.hash(password, 7);

    const newUser = await User.create({
      name: name,
      email: email,
      password: encryptPassword,
    });

    return res.status(201).json({
      status: "Success",
      message: "User Registered",
      data: newUser, 
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// PUT USER
async function updateUser(req, res) {
  try {
    let { password } = req.body;

    
    if (password) {
      const encryptPassword = await bcrypt.hash(password, 7);
      password = encryptPassword;
    }

    if (Object.keys(req.body).length < 2) {
      const error = new Error("Field cannot be empty 😠");
      error.statusCode = 400;
      throw error;
    }

    const ifUserExist = await User.findOne({ where: { id: req.params.id } });

    if (!ifUserExist) {
      const error = new Error("Admin tidak ditemukan 😮");
      error.statusCode = 400;
      throw error;
    }

    const result = await User.update(
      { ...req.body, password },
      { where: { id: req.params.id } }
    );

    if (result[0] == 0) {
      const error = new Error("Tidak ada data yang berubah");
      error.statusCode = 400;
      throw error;
    }

    return res.status(200).json({
      status: "Success",
      message: "User Updated",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// DELETE USER
async function deleteUser(req, res) {
  try {
   
    const ifUserExist = await User.findOne({ where: { id: req.params.id } });

    
    if (!ifUserExist) {
      const error = new Error("Admin tidak ditemukan 😮");
      error.statusCode = 400;
      throw error;
    }

   
    const result = await User.destroy({ where: { id: req.params.id } });

    if (result == 0) {
      const error = new Error("Tidak ada data yang berubah");
      error.statusCode = 400;
      throw error;
    }

    return res.status(200).json({
      status: "Success",
      message: "User Deleted",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// Fungsi LOGIN
async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email: email },
    });

    // Kalo email ada (terdaftar)
    if (user) {
     
      const userPlain = user.toJSON(); 
      const { password: _, refresh_token: __, ...safeUserData } = userPlain;
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const accessToken = jwt.sign(
          safeUserData, 
          process.env.ACCESS_TOKEN_SECRET, 
          { expiresIn: "60s" } // <- Masa berlaku token
        );

        const refreshToken = jwt.sign(
          safeUserData,
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d" }
        );

        await User.update(
          { refresh_token: refreshToken },
          {
            where: { id: user.id },
          }
        );


        res.cookie("refreshToken", refreshToken, {
          httpOnly: false, // <- Untuk keperluan PRODUCTION wajib true
          sameSite: "none", // <- Untuk API yang diakses dari domain berbeda
          maxAge: 24 * 60 * 60 * 1000,
          secure: true,
        });

        // Kirim respons berhasil (200)
        return res.status(200).json({
          status: "Success",
          message: "Login Berhasil",
          data: safeUserData, // <- Data user tanpa informasi sensitif
          accessToken,
        });
      } else {
        // Kalau password salah, masuk ke catch, kasi message "Password atau email salah" (400)
        const error = new Error("Password atau email salah");
        error.statusCode = 400;
        throw error;
      }
    } else {
      // Kalau email salah, masuk ke catch, kasi message "Password atau email salah" (400)
      const error = new Error("Paassword atau email salah");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// Fungsi LOGOUT
async function logout(req, res) {
  try {
    // ngambil refresh token di cookie
    const refreshToken = req.cookies.refreshToken;

    // Ngecek ada ga refresh tokennya, kalo ga ada kirim status code 401
    if (!refreshToken) {
      const error = new Error("Refresh token tidak ada");
      error.statusCode = 401;
      throw error;
    }

    // Kalau ada, cari user berdasarkan refresh token tadi
    const user = await User.findOne({
      where: { refresh_token: refreshToken },
    });

    // Kalau user gaada, kirim status code 401
    if (!user.refresh_token) {
      const error = new Error("User tidak ditemukan");
      error.statusCode = 401;
      throw error;
    }

    // Kalau user ketemu (ada), ambil user id
    const userId = user.id;

    // Hapus refresh token dari DB berdasarkan user id tadi
    await User.update(
      { refresh_token: null },
      {
        where: { id: userId },
      }
    );

    // Ngehapus refresh token yg tersimpan di cookie
    res.clearCookie("refreshToken");

    // Kirim respons berhasil (200)
    return res.status(200).json({
      status: "Success",
      message: "Logout Berhasil",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

export {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  logout,
};