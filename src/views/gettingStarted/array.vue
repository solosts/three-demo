<!-- 基础 -->
<template>
  <div ref="webgl"></div>
</template>
<script setup lang='ts'>
import * as THREE from 'three';
// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//引入性能监视器stats.js
import Stats from 'three/addons/libs/stats.module.js';
import { onMounted, ref } from 'vue';
// 创建3D场景对象Scene
const scene = new THREE.Scene();

//创建一个长方体几何对象Geometry
const geometry = new THREE.BoxGeometry(100, 100, 100);
//创建一个材质对象Material
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,//0xff0000设置材质颜色为红色
  transparent: true,//开启透明
  opacity: 0.5,//设置透明度
  side: THREE.DoubleSide,//双面可见
});


// 沿着X轴阵列多个立方体网格模型
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    // 两个参数分别为几何体geometry、材质material
    const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    mesh.position.set(i * 200, 0, j * 200)
    scene.add(mesh); //将网格模型添加到场景中
  }
}

// AxesHelper：辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(150);
scene.add(axesHelper);

// 创建一个光源对象
// 点光源
const pointLight = new THREE.PointLight(0xffffff, 1.0);
//点光源位置
pointLight.position.set(400, 200, 300);
scene.add(pointLight); //点光源添加到场景中

// 光源辅助观察   可视化点光源
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
// scene.add(pointLightHelper);

//环境光:没有特定方向，整体改变场景的光照明暗
// 添加环境光
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

// 平行光      添加平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
directionalLight.position.set(0, 100, 0);
// 方向光指向对象网格模型mesh，可以不设置，默认的位置是0,0,0
// directionalLight.target = mesh;
scene.add(directionalLight);

// DirectionalLightHelper：可视化平行光
const dirLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5, 0xff0000);
scene.add(dirLightHelper);

// 定义相机输出画布的尺寸(单位:像素px)
const width = window.innerWidth; //宽度
const height = window.innerHeight; //高度
// 实例化一个透视投影相机对象
const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 8000);
//相机在Three.js三维坐标系中的位置
// 根据需要设置相机位置具体值
camera.position.set(2000, 2000, 2000);

//相机观察目标指向Threejs 3D空间中某个位置
// camera.lookAt(0, 0, 0); //坐标原点
// camera.lookAt(0, 10, 0);  //y轴上位置10
camera.lookAt(1000, 0, 1000);

// 创建渲染器对象
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height); //设置three.js渲染区域的尺寸(像素px)
renderer.render(scene, camera) //执行渲染操作

const webgl = ref()
onMounted(() => {
  webgl.value.appendChild(renderer.domElement);

  //创建stats对象
  const stats: any = new Stats();
  //stats.domElement:web页面上输出计算结果,一个div元素，
  webgl.value.appendChild(stats.domElement);

  // 设置相机控件轨道控制器OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(1000, 0, 1000);
  controls.update();

  controls.addEventListener('change', function () {
    renderer.render(scene, camera); //执行渲染操作
  });//监听鼠标、键盘事件

  window.onresize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }

})
</script>
<style lang='scss' scoped></style>