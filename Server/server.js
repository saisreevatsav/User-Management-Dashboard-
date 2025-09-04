// Create new user
app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.validate();
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      // Send validation errors with 400 Bad Request
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user
app.put('/api/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // this triggers schema validation on update
    });
    if (!updatedUser)
      return res.status(404).json({ message: 'User not found' });
    res.json(updatedUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(400).json({ message: err.message });
  }
});

// Improved error handling example for getting user by ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});
