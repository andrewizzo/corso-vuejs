<template>
  <main class="max-w-2xl mx-auto px-4">
    <nav class="font-medium text-center text-gray-500 border-b border-gray-200 mb-4">
      <ul class="flex flex-wrap -mb-px">
        <li v-for="tab in tabs" :key="tab.key">
          <TabLink :tab="tab" :currentTab="currentTab" @click="currentTab = tab.key" />
        </li>
      </ul>
    </nav>
    <FadeTransition>
      <KeepAlive>
        <component :is="currentTabComponent"/>
      </KeepAlive>
    </FadeTransition>
    <NotificationList />
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Tab, TabKey } from '@/types/types';
import TabLink from '@/components/TabLink.vue';
import General from '@/components/General.vue';
import Notifications from '@/components/Notifications.vue';
import Privacy from '@/components/Privacy.vue';
import FadeTransition from '@/components/FadeTransition.vue';
import NotificationList from '@/components/NotificationList.vue';

  const tabs : Tab[] = [
    {
      key:'General',
      label:'General',
      component: General
    },
    {
      key:'Notifications',
      label:'Notifications',
      component: Notifications
    },
    {
      key:'Privacy',
      label:'Privacy',
      component: Privacy
    }
  ]

  const currentTab = ref<TabKey>('General')

  const currentTabComponent = computed(() => tabs.find(tab => tab.key === currentTab.value)?.component)
</script>

<style>
</style>
