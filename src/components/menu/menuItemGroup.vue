<template>
    <li class=" zcy-menu-item-group">
        <div class="zcy-menu-item-group-title">
            {{title}}
        </div>
        <ul class="zcy-menu-item-group-list">
            <slot></slot>
        </ul>
    </li>
</template>

<script>
    export default {
        name:'vMenuItemGroup',
        props: {
            title: String
        }
    }
</script>