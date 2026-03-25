---
name: Vue 最佳实践
trigger: always_on
globs: ['**/*.vue']
---

# Vue Rules

- 优先采用 `<script setup lang="ts">` 语法糖
- 组件 `<template>` 和 `<script>` 标签内使用 `props` 内变量时加上 `props.` 前缀
- 优先使用 `function` 关键字定义 `setup` 中的函数
- 将组件模块化为更小的、可重用的部分
- 显式导入`ref`, `reactive`等vue相关函数，避免导入`defineProps`等宏函数
