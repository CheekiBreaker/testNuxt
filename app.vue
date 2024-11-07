<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto py-8">
      <div class="mb-8">
        <select
          v-model="currentLanguage"
          class="px-4 py-2 border rounded-lg"
        >
          <option value="ru">Русский</option>
          <option value="en">English</option>
          <option value="fr">Français</option>
        </select>
      </div>
      
      <TreeView :tree-data="treeData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useLanguageStore } from '~/stores/language';
import type { TreeNode } from '~/types/tree';

const treeData = ref<TreeNode[]>([]);
const languageStore = useLanguageStore();
const { currentLanguage } = storeToRefs(languageStore);

onMounted(async () => {
  try {
    const response = await fetch('/task_json.txt');
    treeData.value = await response.json();
  } catch (error) {
    console.error('Error loading tree data:', error);
  }
});
</script>