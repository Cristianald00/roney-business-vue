<template>
    <div id="app-container">
        <component :is="layout">
            <router-view />
        </component>
    </div>
</template>

<script>
import router from './router'
import { defineComponent, ref } from 'vue'
import RoneyPreAuthLayout from './components/core/RoneyPreAuthLayout.vue'
import RoneyPostAuthLayout from './components/core/RoneyPostAuthLayout.vue'

export default defineComponent({
    setup() {
        // Do every time page refreshes
    },
    computed: {
        layout() {
            // If is authenticated, route to dashboard
            const requiresAuth = router.currentRoute.value.meta.requiresAuth
            const allowsPublicAccess = router.currentRoute.value.meta.allowsPublicAccess

            // If is authenticated route layout
            if ( requiresAuth ) {
                return 'RoneyPostAuthLayout'
            }
            // If is not authenticated route layout
            if ( allowsPublicAccess ) {
                return 'RoneyPreAuthLayout'
            }
            // If not authenticated, route to login
            return 'RoneyPreAuthLayout'
        }
    },
    methods: {
    },
    components: {
        RoneyPreAuthLayout,
        RoneyPostAuthLayout
    }
})

</script>

<style media="screen">
:root {
	/* COOLORS */
	--colorRed: #e83239;
	--colorGray: #e6e6e8;
	--colorWhite: #ffffff;
	--colorBlack: #33313f;

    --colorRoneyBlue: #171d2b;

	--colorLetterBlack: #33313f;

    --colorLightBlack: #545358;
    --colorLightGray: #F2F2F0;
    --colorWhiteDarker: #f4f4f4;

    /* PADDINGS */
    --inputPadding: 8px 12px;
    --inputPaddingBig: 10px 14px;
}

html, body {
    display: block;
	width: 100%;
	padding: 0px;
	margin: 0px;
    background: var(--colorLightGray);
	color: var(--colorLetterBlack);
	font-family: 'Open Sans', sans-serif;
	letter-spacing: 1px;
    box-sizing: border-box;
}

#app {
    display: block;
    width: 100%;
    max-width: none;
    padding: 0px;
	margin: 0px;
    box-sizing: border-box;
}
#app-container {
    display: block;
    width: 100%;
    padding: 0px;
	margin: 0px;
    box-sizing: border-box;
}

.row-block {

}

.column-block {
    display: inline-block;
}
</style>
