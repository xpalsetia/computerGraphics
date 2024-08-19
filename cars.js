/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "../libs/CS559-Three/examples/jsm/loaders/MTLLoader.js";
import { GLTFLoader } from "../libs/CS559-Three/examples/jsm/loaders/GLTFLoader.js";

// define your vehicles here - remember, they need to be imported
// into the "main" program

// into the "main" program
export class Car extends GrObject{
    constructor(){
      let geometry = new T.BoxGeometry(1, 0.5, 2);
      let material = new T.MeshBasicMaterial({ color: 'darkred', roughness: 0});
      let mesh = new T.Mesh(geometry, material);
      mesh.position.y=0.3
      let roofGeometry = new T.BoxGeometry(1,0.3,1);
      let roofMaterial = new T.MeshBasicMaterial({color: "white"});
      let roof = new T.Mesh(roofGeometry, roofMaterial);
      roof.position.y = 0.7
      let windows1 = new T.Mesh(new T.BoxGeometry(1.1,0.2,0.7),new T.MeshBasicMaterial({color: "black"}))
      windows1.position.y = 0.7
      let windows2 = new T.Mesh(new T.BoxGeometry(0.8,0.2,0.7),new T.MeshBasicMaterial({color: "DimGray"}))
      windows2.position.y = 0.7
      windows2.position.z = 0.2

      let wing = new T.Mesh(new T.TorusGeometry(0.4,0.1,30,100), new T.MeshBasicMaterial({color: "darkred"}))
      wing.position.y = 0.5
      wing.position.z = -0.9

      let wheel1 = new T.Mesh(new T.CylinderGeometry(0.2,0.2,1.1,20), new T.MeshBasicMaterial({color: "black"}))
      wheel1.rotation.z = Math.PI/2;
      wheel1.position.z = 0.5
      wheel1.position.y = 0.15;

      let wheel2 = new T.Mesh(new T.CylinderGeometry(0.2,0.2,1.1,20), new T.MeshBasicMaterial({color: "black"}))
      wheel2.rotation.z = Math.PI/2;
      wheel2.position.z = -0.5
      wheel2.position.y = 0.15;

      let car = new T.Group();
      
      car.add(mesh);
      car.add(roof);
      car.add(windows1)
      car.add(windows2)
      car.add(wing);
      car.add(wheel1);
      car.add(wheel2);
  
      super("Car", car);
    }
  }
  export class UFO extends GrObject {
    constructor(color) {
        let ufoGeometry = new T.SphereGeometry(0.3, 20, 20);
        let ufoMaterial = new T.MeshStandardMaterial({ color: color, roughness: 0.8 });
        let ufoMesh = new T.Mesh(ufoGeometry, ufoMaterial);
        ufoMesh.position.y = 2;

        let armGeometry = new T.BoxGeometry(1.9, 0.2, 0.2);
        let armMaterial = new T.MeshStandardMaterial({ color: color, roughness: 0.2 });
        let armMesh = new T.Mesh(armGeometry, armMaterial);
        let armMesh2 = new T.Mesh(armGeometry, armMaterial);
        armMesh2.rotateY(Math.PI / 2);

        let bladeGeometry = new T.BoxGeometry(0.8, 0.05, 0.1);
        let BladeMat = new T.MeshStandardMaterial({ color: "gray", roughness: 0.2 });
        let blades = [];
        for (let i = 0; i < 8; i++) {
            let blade = new T.Mesh(bladeGeometry, BladeMat);
            if (i < 4) {
                blade.position.x = i % 2 === 0 ? 0.9 : -0.9;
            } else {
                blade.position.z = i % 2 === 0 ? 0.9 : -0.9;
            }
            blade.position.y = 0.15;
            blades.push(blade);
            ufoMesh.add(blade);
        }

        ufoMesh.add(armMesh);
        ufoMesh.add(armMesh2);
        super("UFO", ufoMesh);

        this.time = 0;
        this.blades = blades;
        this.rideable = ufoMesh;
    }

    stepWorld(delta, timeOfDay) {
        this.time += delta;

        // Example: rotate all blades
        this.blades.forEach((blade, index) => {
          let offset = (index % 2 === 0) ? 0 : Math.PI / 2;
          blade.rotation.y = delta * 0.5 + offset;
        });

        this.objects[0].lookAt(10, 20, -20);
        this.objects[0].position.y = 6 + Math.sin(this.time * 0.005) * 0.5;

        this.objects[0].position.x += Math.sin(this.time * 0.002) * 0.1;
        this.objects[0].position.z += Math.cos(this.time * 0.002) * 0.1;
    }
}

let shipCount = 0
export class XWing extends GrObject {
  constructor(startPosition) {
    let ships = new T.Group();
    let xwing;
    let loader = new GLTFLoader();
    loader.load("../images/xwing.glb", function (gltf) {
    xwing = gltf.scene;
    xwing.scale.set(2, 2, 2);
    xwing.position.y = 9;
    //car.position.y = .25;
    ships.add(xwing);
    });

    ships.position.set(0, .25, 0);

    super("Xwing" + shipCount, ships);
    this.time = 0;
    this.rideable = ships;
    shipCount++;
    this.startPosition = startPosition;
  }

  stepWorld(delta, timeOfDay) {
    this.time += delta/1000;

    let speed = 0.4; // Speed factor can be adjusted
    let dx = 15*Math.sin(this.time);
    let dz =15*Math.cos(this.time);

    // Update position
    this.objects[0].position.x = dx+this.startPosition;
    this.objects[0].position.z = dz+this.startPosition;

    let angle = Math.atan2(dx, dz)+Math.PI;
    this.objects[0].rotation.y = angle;
    this.rideable.position.set(dx+this.startPosition,9,dz+this.startPosition);
  }
}

let sShipCount = 0
export class Spaceship extends GrObject {
  constructor(startPosition) {
    let ships = new T.Group();
    let spaceship;
    let loader = new GLTFLoader();
    loader.load("../images/Spaceship.glb", function (gltf) {
    spaceship = gltf.scene;
    spaceship.scale.set(0.02, 0.02, 0.02);
    spaceship.position.y = 9;
    //car.position.y = .25;
    ships.add(spaceship);
    });

    ships.position.set(0, .25, 0);

    super("Spaceship" + sShipCount, ships);
    this.time = 0;
    this.rideable = ships;
    shipCount++;
    this.startPosition = startPosition;
  }
  stepWorld(delta, timeOfDay) {
    this.time += delta/1000;

    let speed = 0.4; // Speed factor can be adjusted
    let dx = 15*Math.sin(this.time);
    let dz =15*Math.cos(this.time);

    // Update position
    this.objects[0].position.x = dx;
    this.objects[0].position.y = dz+15;
    this.objects[0].lookAt(0, 20, -20)

  }
  
}
