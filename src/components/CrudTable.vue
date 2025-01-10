<template>
    <table>
        <thead>
            <tr>
                <th v-for="column in columns" :key="column.key">{{ column.label }}</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items" :key="item.id">
                <td v-for="column in columns" :key="column.key">{{ item[column.key] }}</td>
                <td>
                    <button @click="editItem(item)">Edit</button>
                    <button @click="deleteItem(item)">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script setup lang="ts">

const props = defineProps<{
    items: any[],
    columns: { key: string, label: string }[]
}>()

const emit = defineEmits(['edit', 'delete'])

const editItem = (item: any) => {
    emit('edit', item)
}

const deleteItem = (item: any) => {
    emit('delete', item)
}
</script>