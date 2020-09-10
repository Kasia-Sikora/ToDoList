export let utils = {
    compare: function (a, b) {
        if (a.display_order < b.display_order) {
            return -1;
        }
        if (a.display_order > b.display_order) {
            return 1;
        }
        return 0;
    },
}