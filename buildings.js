/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

// define your buildings here - remember, they need to be imported
// into the "main" program
export class House extends GrObject{
    constructor(height){
      let geometry = new T.BoxGeometry(2, height, 2);
      let texture = new T.TextureLoader().load("../images/sand2.jpeg");
      let material = new T.MeshBasicMaterial({ color: 'tan', map: texture});
      let mesh = new T.Mesh(geometry, material);
      let roofGeometry = new T.SphereGeometry(1);
      let roofMaterial = new T.MeshBasicMaterial({ color: 'lightbrown', map: texture});
      let roof = new T.Mesh(roofGeometry, roofMaterial);
      roof.position.y = height/2 ;
      let house = new T.Group();
      house.add(mesh);
      house.add(roof);
  
      super("House", house);
    }
  }
  
  export class Tower extends GrObject {
    constructor(height) {
      let geometry = new T.CylinderGeometry(0.2,1,height);
      let texture = new T.TextureLoader().load("../images/sand.jpeg");
      let material = new T.MeshBasicMaterial({ color: "white", map:texture  });
      let mesh = new T.Mesh(geometry, material);
      mesh.position.y = height/2;
  
      let roofGeometry = new T.TorusGeometry( 0.5, 0.2, 100, 100 );
      let roofMaterial = new T.MeshBasicMaterial({ color: "gray" , map:texture});
      let roof = new T.Mesh(roofGeometry, roofMaterial);
      roof.rotation.x = Math.PI / 2; 
      roof.position.y = height/3+0.5;
  
      let roofGeometry2 = new T.TorusGeometry( 0.3, 0.2, 100, 100 );
      let roofMaterial2 = new T.MeshBasicMaterial({ color: "gray" , map:texture});
      let roof2 = new T.Mesh(roofGeometry2, roofMaterial2);
      roof2.rotation.x = Math.PI / 2; 
      roof2.position.y = height/3+1.5;
  
      let tower = new T.Group();
      tower.add(mesh);
      tower.add(roof);
      tower.add(roof2)
  
      super("Tower", tower);
    }
  }
  
  export class CylinderBuilding extends GrObject {
    constructor(height) {
      let texture = new T.TextureLoader().load("../images/sand2.jpeg");
      let geometry = new T.CylinderGeometry(1, 0.7, height, 8);
      let material = new T.MeshBasicMaterial({ color: "Moccasin", map : texture });
      let mesh = new T.Mesh(geometry, material);
      mesh.position.y = height/2;
  
    let roofGeometry = new T.ConeGeometry(1,0.8,8);
    let roofMaterial = new T.MeshBasicMaterial({ color: "peru" , map:texture});
      let roof = new T.Mesh(roofGeometry, roofMaterial);
      roof.position.y = height+0.4;
  
      let cyl = new T.Group();
  
      cyl.add(mesh);
      cyl.add(roof);
    
  
      super("CylinderBuilding", cyl);
    }
  }
  
  export class Tree extends GrObject {
    constructor() {
      let trunkGeometry = new T.CylinderGeometry(0.1, 0.1, 0.5);
      let trunkMaterial = new T.MeshBasicMaterial({ color: "Sienna" });
      let trunk = new T.Mesh(trunkGeometry, trunkMaterial);
      trunk.position.y = 0.25;
  
      let leavesGeometry = new T.SphereGeometry(0.25);
      let leavesMaterial = new T.MeshBasicMaterial({ color: "ForestGreen" });
      let leaves = new T.Mesh(leavesGeometry, leavesMaterial);
      leaves.position.y = 0.5;
  
      let tree = new T.Group();
      tree.add(trunk);
      tree.add(leaves);
  
      super("Tree", tree);
    }
  }
  
  export class DomeHouse extends GrObject {
    constructor() {
      let texture = new T.TextureLoader().load("../images/sand.jpeg"); // Assume another sandy texture file
      let baseGeometry = new T.CylinderGeometry(1.5, 1.5, 2, 32);
      let baseMaterial = new T.MeshBasicMaterial({ color: "darkkhaki", map: texture });
      let base = new T.Mesh(baseGeometry, baseMaterial);
  
      let domeGeometry = new T.SphereGeometry(1.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
      let domeMaterial = new T.MeshBasicMaterial({ color: "wheat", map: texture });
      let dome = new T.Mesh(domeGeometry, domeMaterial);
      dome.position.y = 1;
  
      let house = new T.Group();
      house.add(base);
      house.add(dome);
  
      super("DomeHouse", house);
    }
  }

  export class CommunicationTower extends GrObject {
    constructor(height) {
      let texture = new T.TextureLoader().load("../images/metal.jpeg"); // Assume a metallic texture
      let poleGeometry = new T.CylinderGeometry(0.1, 0.3, height, 8);
      let poleMaterial = new T.MeshBasicMaterial({ color: "slategray", map: texture });
      let pole = new T.Mesh(poleGeometry, poleMaterial);
      pole.position.y = height / 2;
  
      let dishGeometry = new T.TorusGeometry(0.5, 0.1, 16, 100);
      let dishMaterial = new T.MeshBasicMaterial({ color: "silver", map: texture });
      let dish = new T.Mesh(dishGeometry, dishMaterial);
      dish.rotation.x = Math.PI / 2;
      dish.position.y = height - 0.5;
  
      let antennaGeometry = new T.CylinderGeometry(0.02, 0.02, 0.4);
      let antennaMaterial = new T.MeshBasicMaterial({ color: "gray" });
      let antenna = new T.Mesh(antennaGeometry, antennaMaterial);
      antenna.position.y = height + 0.2;
  
      let tower = new T.Group();
      tower.add(pole);
      tower.add(dish);
      tower.add(antenna);
  
      super("CommunicationTower", tower);
    }
  }
  
  export class MarketStall extends GrObject {
    constructor() {
      let baseGeometry = new T.BoxGeometry(2, 1, 1);
      let baseMaterial = new T.MeshBasicMaterial({ color: "peru" });
      let base = new T.Mesh(baseGeometry, baseMaterial);
      base.position.y = 0.1;
  
      let canopyGeometry = new T.CylinderGeometry(1, 1, 1, 32, 1, true);
      let canopyMaterial = new T.MeshBasicMaterial({ color: "sandybrown", side: T.DoubleSide });
      let canopy = new T.Mesh(canopyGeometry, canopyMaterial);
      canopy.position.y = 1;
      canopy.rotation.x = Math.PI / 2;
  
      let stall = new T.Group();
      stall.add(base);
      stall.add(canopy);
  
      super("MarketStall", stall);
    }
  }

  export class WaterTower extends GrObject {
    constructor(texture) {
      let supportGeometry = new T.CylinderGeometry(0.1, 0.1, 3, 8);
      let supportMaterial = new T.MeshBasicMaterial({ color: "dimgray" });
  
      let supports = new T.Group();
      for (let i = 0; i < 4; i++) {
        let angle = Math.PI / 2 * i;
        let support = new T.Mesh(supportGeometry, supportMaterial);
        support.position.x = Math.cos(angle) * 0.8;
        support.position.z = Math.sin(angle) * 0.8;
        supports.add(support);
      }
  
      let tankGeometry = new T.CylinderGeometry(0.8, 0.8, 1.5, 16);
      let tankMaterial = new T.MeshBasicMaterial({ color: "silver", envMap: texture });
      let tank = new T.Mesh(tankGeometry, tankMaterial);
      tank.position.y = 2.25;
  
      let waterTower = new T.Group();
      waterTower.add(supports);
      waterTower.add(tank);
  
      super("WaterTower", waterTower);
    }
  }
  
  