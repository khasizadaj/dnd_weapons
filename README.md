# DND Weapons Management Tool

## Purpose

The DND Weapons Management Tool is designed to enhance the tabletop gameplay 
experience by providing a simple and intuitive way to manage weapons during 
a D&D campaign. It allows players and Dungeon Masters to visualize weapon 
details, manage damage types, and perform attack rolls with ease.

## Installation

To begin using this tool, follow these steps:

```bash
# Clone the repository to your local machine
git clone https://github.com/khasizadaj/dnd_weapons.git

# Navigate to the cloned directory
cd dnd_weapons
```


## Running it lcoally

Due to browser security restrictions, you might encounter CORS issues when trying to run the application directly from the filesystem. To avoid this, you can set up a local development server using one of the following methods:


### Using Python's Built-in HTTP Server

If you have Python installed, you can quickly set up a server with the following command:

```bash
# If you have Python 3.x installed
python -m http.server 8000 -b 127.0.0.1
```

After running this command, open `http://127.0.0.1:8000` in your browser.


### Using Node.js `http-server`

For a Node.js-based server, install `http-server` globally using npm:

```bash
npm install -g http-server
```

Then navigate to your project directory and start the server:

```bash
http-server -a 127.0.0.1 -p 8000
```

Your application will be served at `http://localhost:8080` or the next available port.


### Live Server in Visual Studio Code

For those using Visual Studio Code as their IDE, the Live Server extension can be very handy:

1. Install the Live Server extension from the VSCode marketplace.
2. Open your project in VSCode.
3. Right-click on the `index.html` file and select "Open with Live Server".

Your default web browser should open automatically with the application running.


## Customization
Customize your arsenal in `data/weapons.js` file.

```javascript
const weapons = [
  {
    "id": "your_weapon_id", // make sure this id is unique
    "name": "Your Weapon Name",
    "dice": [
      { "count": 1, "type": 8, "damage": "physical" },
      // Add more dice as needed
    ],
    "modifier": 2
  },
  // Add more weapons
];
```

After editing, relaunch the project.
