const express = require('express');
const fs = require('fs');
const cors = require('cors');  // Importa cors
const app = express();
const port = 3000;

app.use(cors());  // Habilita CORS para todas las solicitudes
app.use(express.json());

// Cargar JSON
const loadMenuData = () => {
    const menuJson = fs.readFileSync('./menu.json');
    return JSON.parse(menuJson);
};

// Guardar cambios en el archivo
const saveMenuData = (menuData) => {
    fs.writeFileSync('./menu.json', JSON.stringify(menuData, null, 2));
};

// Función para agregar un nuevo elemento al menú
const addItem = (menuData, item) => {
    menuData.menu.push(item);
};

// Función para eliminar un elemento del menú por su nombre
const deleteItem = (menuData, nombre) => {
    const index = menuData.menu.findIndex(item => item.nombre === nombre);
    if (index !== -1) {
        menuData.menu.splice(index, 1);
        return true;
    }
    return false;
};

// Ruta principal para manejar solicitudes
app.post('/menu', (req, res) => {
    const menuData = loadMenuData();
    const { action, item, nombre } = req.body;

    if (action === 'add' && item) {
        addItem(menuData, item);
        saveMenuData(menuData);
        return res.json({ message: 'Item added successfully' });
    }

    if (action === 'delete' && nombre) {
        const result = deleteItem(menuData, nombre);
        saveMenuData(menuData);
        return res.json({ message: result ? 'Item deleted successfully' : 'Item not found' });
    }

    return res.status(400).json({ error: 'Invalid request' });
});

// Ruta para obtener el menú (GET)
app.get('/menu', (req, res) => {
    const menuData = loadMenuData();
    res.json(menuData);
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});
app.use(cors({
    origin: 'http://127.0.0.1:5500'  // Solo permite solicitudes de este dominio
}));
