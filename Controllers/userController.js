const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');


exports.signup = async (req, res) => {
  try {
    const { name, email, password, phone_number, role_user, lang } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone_number,
      role_user,
      lang,
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to sign up user' });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const { lang } = req.params;

    const users = await User.findAll({
      where: { lang },
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};


exports.getUserById = async (req, res) => {
  try {
    const { id, lang } = req.params;

    const user = await User.findOne({
      where: { id, lang },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};


exports.updateUser = async (req, res) => {
    try {
      const { id, lang } = req.params;
      const { name, email, phone_number, role_user, password } = req.body;
  
      const user = await User.findOne({
        where: { id, lang },
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      
      user.name = name || user.name;
      user.email = email || user.email;
      user.phone_number = phone_number || user.phone_number;
      user.role_user = role_user || user.role_user;
  
      
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }
  
  
      await user.save();
      res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  };

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id, role: user.role_user }, 'secret_key', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
};
