<template>
  <div class="border-l-2 border-gray-200 pl-4">
    <div class="flex items-start gap-2">
      <button
        @click="isOpen = !isOpen"
        class="mt-1 w-4 h-4 flex items-center justify-center border rounded"
        v-if="node.childs?.length"
      >
        {{ isOpen ? '-' : '+' }}
      </button>
      <div class="flex-1">
        <a
          :href="nodeLink"
          class="text-blue-600 hover:text-blue-800"
          target="_blank"
        >
          {{ nodeName }}
        </a>
        <div class="text-sm text-gray-500 mt-1">
          {{ breadcrumbs }}
        </div>
      </div>
    </div>
    
    <div v-if="isOpen && node.childs" class="ml-4 mt-2">
      <TreeNode
        v-for="child in node.childs"
        :key="child.id"
        :node="child"
        :parentNodes="[...currentPath]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useLanguageStore } from '~/stores/language';
import type { TreeNode } from '~/types/tree';

const props = defineProps<{
  node: TreeNode;
  parentNodes?: TreeNode[];
}>();

const isOpen = ref(false);
const languageStore = useLanguageStore();
const currentPath = computed(() => [...(props.parentNodes || []), props.node]);

const localizedContent = computed(() => {
  return languageStore.getLocalizedContent(props.node.locale);
});

const nodeName = computed(() => {
  return localizedContent.value?.cg_name || 'Unnamed';
});

const nodeLink = computed(() => {
  return localizedContent.value?.link || '#';
});

const breadcrumbs = computed(() => {
  if (!props.node.path_to_top.length) {
    return nodeName.value;
  }

  const breadcrumbs: string[] = [];
  
  // Add parent nodes names
  if (props.parentNodes) {
    for (const parentNode of props.parentNodes) {
      const content = languageStore.getLocalizedContent(parentNode.locale);
      if (content?.cg_name) {
        breadcrumbs.push(content.cg_name);
      }
    }
  }
  
  // Add current node name
  breadcrumbs.push(nodeName.value);
  
  return breadcrumbs.join(' -> ');
});
</script>