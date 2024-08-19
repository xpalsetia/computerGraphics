/*jshint esversion: 6 */
// @ts-check

/**
 * Graphics Town Framework - "Main" File
 *
 * This is the main file - it creates the world, populates it with
 * objects and behaviors, and starts things running
 *
 * The initial distributed version has a pretty empty world.
 * There are a few simple objects thrown in as examples.
 *
 * It is the students job to extend this by defining new object types
 * (in other files), then loading those files as modules, and using this
 * file to instantiate those objects in the world.
 */
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { WorldUI } from "../libs/CS559-Framework/WorldUI.js";
import { House, Tower, CylinderBuilding, Tree, DomeHouse, CommunicationTower, MarketStall, WaterTower } from "./buildings.js";
import { Car, UFO, XWing, Spaceship } from "./cars.js";
import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js"; // Import OBJLoader
import { MTLLoader } from "../libs/CS559-Three/examples/jsm/loaders/MTLLoader.js"; // Import MTLLoader
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as T from "../libs/CS559-Three/build/three.module.js";

/**m
 * The Graphics Town Main -
 * This builds up the world and makes it go...
 */

// make the world
let world = new GrWorld({
    width: 800,
    height: 600,
    groundplanesize: 20, // make the ground plane big enough for a world of stuff
    groundplanecolor: '#B19B83'
});

const tempLoad = new T.CubeTextureLoader();

const backTexture = tempLoad.load([
    '../images/px.png',
    '../images/nx.png',
    '../images/py.png',
    '../images/ny.png',
    '../images/pz.png',
    '../images/nz.png'
]);

world.scene.background = backTexture;

// Initialize the town with more and larger buildings, including 20 DomeHouses
function initializeTown(world) {
    // Centerpiece - Larger Water Tower
    let waterTower = new WaterTower(backTexture);
    waterTower.objects[0].position.set(-17, 3, -15); // Center of the town
    waterTower.objects[0].scale.set(2.5, 2.5, 2.5); // Making the water tower larger
    world.add(waterTower);

    // Expanded Market Area with more stalls
    let stallPositions = [
      { x: 4, z: -1 }, { x: -2, z: -1 }, { x: 1, z: 2 }, { x: 1, z: -4 },
    ];
    stallPositions.forEach(pos => {
      let marketStall = new MarketStall();
      marketStall.objects[0].position.set(pos.x, 0, pos.z);
      world.add(marketStall);
    });

    // More Residential Houses placed and some larger
    let housePositions = [
      { x: 12, z: 12 }, { x: -12, z: -12 }, { x: 12, z: -12 }, { x: -12, z: 12 },
      { x: 8, z: 17 }, { x: -8, z: 17 }, { x: 0, z: 17 }, { x: 8, z: -17 }, { x: -8, z: -17 }, { x: 0, z: -17 }
    ];
    housePositions.forEach((pos, idx) => {
      let scale = (idx % 2 === 0) ? 1.2 : 1; 
      let house = new House(3 + Math.random() * 2);
      house.objects[0].position.set(pos.x, 0, pos.z);
      house.objects[0].scale.set(scale, scale, scale); // Scale some houses larger
      world.add(house);
    });


    let communicationTower = new CommunicationTower(6);
    communicationTower.objects[0].position.set(15, 0, -15);
    communicationTower.objects[0].scale.set(1.5, 1.5, 1.5); // Larger tower
    world.add(communicationTower);

    let cylinderBuilding = new CylinderBuilding(5);
    cylinderBuilding.objects[0].position.set(-15, 0, 15);
    cylinderBuilding.objects[0].scale.set(1.2, 1.2, 1.2); // Slightly larger
    world.add(cylinderBuilding);



    // Add 20 DomeHouses in a structured pattern
    for (let i = -15; i <= 20; i += 8) {
        for (let j = -9; j <= 10; j += 8) {
            let domeHouse = new DomeHouse();
            domeHouse.objects[0].position.set(i, 0, j);
            world.add(domeHouse);
            
        }
    }

    let towerPositions = [
        { x: 19, z: 5 }, { x: -19, z: 5 }, { x: 5, z: -19 }, { x: -5, z: -19 },
      ];

    towerPositions.forEach(pos => {
        let tower = new Tower(3);
        tower.objects[0].position.set(pos.x, 0, pos.z);
        world.add(tower);
    });


    // Adding more trees for greenery
    let treePositions = [
      { x: 5, z: 5 }, { x: -5, z: 5 }, { x: 5, z: -5 }, { x: -5, z: -5 },
      { x: 10, z: 0 }, { x: -10, z: 0 }, { x: 0, z: 10 }, { x: 0, z: -10 },
      { x: 7, z: 0 }, { x: -7, z: 0 }, { x: 0, z: 7 }, { x: 0, z: -7 }
    ];
    treePositions.forEach(pos => {
      let tree = new Tree();
      tree.objects[0].position.set(pos.x, 0, pos.z);
      world.add(tree);
    });
}

initializeTown(world);

  

// Vehicles
const objLoader = new OBJLoader();
const mtlLoader = new MTLLoader();

let deathStar;
mtlLoader.load(
    '../images/DeathStar/materials.mtl',
    function (materials) {
        materials.preload();
        objLoader.setMaterials(materials);
        objLoader.load(
            '../images/DeathStar/model.obj',
            function (object) {
                object.scale.set(40, 40, 40);
                object.position.set(0, 20, -20);
                
                deathStar = new GrObject("DeathStar", object);
                world.add(deathStar);

            },
            undefined,
            function (error) {
                console.error(error);
            }
        );
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

let xwing = new XWing(1);
world.add(xwing);
let xwing2 = new XWing(10)
world.add(xwing2);
let xwing3 = new XWing(-10)
world.add(xwing3);

let spaceship = new Spaceship;
world.add(spaceship);

let ufo = new UFO("blue");
world.add(ufo);
world.ui = new WorldUI(world)

// Render the world
world.go();
