<template>
    <div>
        <p>Journal ID: {{ localJournalId }}</p>
    </div>
</template>

<script>
export default {
    name: "JournalView",
    props: {
        journalId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            localJournalId: this.$route.params.journalId
        };
    }
};
</script>