const { app } = require('./server.js')

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});


//testing