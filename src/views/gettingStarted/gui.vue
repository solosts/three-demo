<!-- 基础 -->
<template>
  <div ref="webgl"></div>
</template>
<script setup lang='ts'>
import * as THREE from 'three';
// 引入dat.gui.js的一个类GUI
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { onMounted, ref } from 'vue';
const gui = new GUI();
const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(100, 100, 100);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
gui.add(mesh.position, 'x', 0, 180);
gui.add(mesh.position, 'y', 0, 180);
gui.add(mesh.position, 'z', 0, 180)

// 定义相机输出画布的尺寸(单位:像素px)
const width = window.innerWidth; //宽度
const height = window.innerHeight; //高度
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0); //坐标原点

// 创建渲染器对象
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height); //设置three.js渲染区域的尺寸(像素px)
renderer.render(scene, camera); //执行渲染操作


const webgl = ref()
onMounted(() => {
  webgl.value.appendChild(renderer.domElement);
})
</script>
<style lang='scss' scoped></style>