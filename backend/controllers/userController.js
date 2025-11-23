import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 

// função para gerar Token JWT
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '3d',
    });
};

// cadastro
export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);

        const token = createToken(user._id);

        res.status(201).json({
            userId: user._id,
            email: user.email,
            name: user.name,
            token
        });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ message: "Email já cadastrado." });
        }
        res.status(400).json({ message: "Erro ao criar usuário.", error: err.message });
    }
};

// login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ message: 'Email ou senha inválidos.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        console.log("--- DEBUG LOGIN ---");
        console.log("Email Tentado:", email);
        console.log("Senha Fornecida:", password);
        console.log("Senha do Banco:", user.password);
        console.log("Resultado da Comparação:", isMatch);
        console.log("-------------------");

        if (!isMatch) {
            return res.status(401).json({ message: 'Email ou senha inválidos.' });
        }

        const token = createToken(user._id);

        res.status(200).json({
            userId: user._id,
            email: user.email,
            name: user.name,
            token
        });

    } catch (error) {
        console.error("Erro interno do servidor no login:", error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

//atualização de perfil
export const updateUser = async (req, res) => {
  try {
    const { id, name, email, password, profilePhoto } = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID do usuário é obrigatório." });
    }

    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (profilePhoto) updateData.profilePhoto = profilePhoto;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.status(200).json({
      message: "Perfil atualizado com sucesso!",
      name: updatedUser.name,
      email: updatedUser.email,
      profilePhoto: updatedUser.profilePhoto,
    });

  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};



