<template>
  <div class="p-4">
    <div v-for="node in treeData" :key="node.id" class="mb-4">
      <TreeNode :node="node" :parentNodes="[]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TreeNode } from '~/types/tree';

defineProps<{
  treeData: TreeNode[];
}>();
</script>