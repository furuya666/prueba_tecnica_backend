import { pool } from "../db.js";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getUser = async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [
        id,
      ]);
  
      if (rows.length <= 0) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json(rows[0]);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };
  
  export const deleteUser= async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
  
      if (rows.affectedRows <= 0) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };
  
  export const createUser = async (req, res) => {
    try {
      const { nombres, apellido_paterno,apellido_materno,contraseña } = req.body;
      
      const [rows] = await pool.query(
        "INSERT INTO users (nombres, apellido_paterno,apellido_materno,contraseña) VALUES (?, ?, ?, ?)",
        [nombres, apellido_paterno,apellido_materno,contraseña]
      );
      res.status(201).json({ id: rows.insertId,  nombres, apellido_paterno,apellido_materno,contraseña });
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };
  
  export const login = async (req, res) => {
    const secretKey = "secret";
    try {
      const { nombres, contraseña } = req.body;
      const [rows] = await pool.query("SELECT * FROM users WHERE nombres = ?  and contraseña  = ? ", [
        nombres,contraseña
      ]);
      if(rows.length>0){
        const token = jwt.sign({ rows }, secretKey, { expiresIn: "1h" });
      return res.status(200).json({ token ,nombres });
      }else{
        const token = "";
        return res.status(200).json({ token  });
      }
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };
  export const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombres, apellido_paterno,apellido_materno,contraseña } = req.body;
  
      const [result] = await pool.query(
        "UPDATE users SET nombres = IFNULL(?, nombres), apellido_paterno = IFNULL(?, apellido_paterno), apellido_materno = IFNULL(?, apellido_materno), contraseña = IFNULL(?, contraseña) WHERE id = ?",
        [nombres, apellido_paterno,apellido_materno,contraseña , id]
      );
  
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "User not found" });
  
      const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [
        id,
      ]);
  
      res.json(rows[0]);
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };
  
