<template>
    <div class="modal-overlay">
      <div class="modal">
        <div class="modal-content">
          <slot></slot>
        </div>
        <button @click="$emit('close')">Close</button>
      </div>
    </div>
  </template>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
  }
  </style>