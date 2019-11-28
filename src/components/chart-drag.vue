<template>

</template>


<script lang="ts">
    import {Vue, Component} from "vue-property-decorator"
    import * as THREE from 'three';
    import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

    declare let require: any;

    import meshVert from "./vertex.glsl";
    import meshFrag from "./frag.glsl";

    let uniforms:any;
    @Component
    export default class extends Vue {
        scene: any = null;
        camera: any = null;
        render: any = null;
        orbitControl: any = null;

        mounted() {
            this.initScene();
            // this.initGeometry();
            this.initAxes();
            this.initMesh();
            this.animate();

        }

        initAxes() {
            let material = new THREE.LineBasicMaterial({
                color: 0x0000ff
            });
            let geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 5, 0));
            let group = new THREE.Group();
            let line = new THREE.Line(geometry, material);
            let positionX = 0;
            group.add(line);
            for (let i = 0; i < 5; i++) {
                let lineClone = line.clone();
                positionX += 1;
                lineClone.position.x = positionX;
                group.add(lineClone);
            }
            let lineRotate = line.clone();
            lineRotate.rotateZ(Math.PI / 2);
            lineRotate.position.x = 5;
            group.add(lineRotate);
            let positionY = 0;
            for (let i = 0; i < 5; i++) {
                let lineClone = lineRotate.clone();
                positionY += 1;
                lineClone.position.y = positionY;
                group.add(lineClone);

            }
            let xAxis = group.clone();
            let yAxis = group.clone();
            xAxis.rotateX(Math.PI / 2);
            yAxis.rotateY(Math.PI / 2);
            yAxis.position.z = 5;
            let axeGroup = new THREE.Group();
            axeGroup.add(xAxis, yAxis, group);
            this.scene.add(axeGroup)
            // this.scene.add(axesHelper);

        }

        initMesh() {
            let arr = [];
            let rowCount = 6;
            for (let i = 0; i < rowCount * rowCount; i++) {
                arr.push(i % 2 == 0 ? 1 : 0);
            }
             uniforms = {

                "time": {value: 1.0}

            };
            // let material = new THREE.MeshBasicMaterial(({color: 0xffff00, side: THREE.DoubleSide}));
            let material = new THREE.ShaderMaterial({
                uniforms:uniforms,
                vertexShader:meshVert,
                fragmentShader:meshFrag,
                side:THREE.DoubleSide
            });


            let group = new THREE.Group();
            for (let i = 0; i < rowCount - 1; i++) {
                for (let j = 0; j < rowCount - 1; j++) {

                    let geometry = new THREE.Geometry();
                    geometry.vertices = [];
                    geometry.vertices.push(new THREE.Vector3(i, arr[rowCount * i + j], arr[rowCount * i + j]), new THREE.Vector3(i + 1, arr[rowCount * (i + 1) + j], j), new THREE.Vector3(i + 1, arr[rowCount * (i + 1) + j + 1], j + 1), new THREE.Vector3(i, arr[rowCount * i + j + 1], j + 1));
                    geometry.faces.push(new THREE.Face3(0, 1, 3));
                    geometry.faces.push(new THREE.Face3(1, 2, 3));
                    console.log(geometry.vertices);
                    group.add(new THREE.Mesh(geometry, material));

                }
            }
            this.scene.add(group);


        }

        getValue() {

        }

        initScene() {
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerWidth, 0.1, 500);
            this.render = new THREE.WebGLRenderer();
            this.scene.background = new THREE.Color(0xf0f0f0);
            this.render.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(this.render.domElement);
            this.orbitControl = new OrbitControls(this.camera, this.render.domElement);
            this.camera.position.y = 10;
            this.camera.position.x = 0;
            this.camera.position.z = 0;

        }

        initGeometry() {
            let geometry = new THREE.BoxGeometry(1, 1, 1);
            let material = new THREE.MeshBasicMaterial({color: 0x00ff00});
            let cube = new THREE.Mesh(geometry, material);
            this.scene.add(cube);


        }

        animate(time?:Date) {
            requestAnimationFrame(() => {
                this.animate(new Date())
            });
            if(time){
                uniforms[ "time" ].value = time.getTime() / 1000;
            }

            this.orbitControl.update();
            this.render.render(this.scene, this.camera);

        }


    }
</script>

<style scoped>

</style>