import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useBasketStore = defineStore('basket', () => {
  const count = ref(0)

  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  return { count, increment, decrement }
})