<template>
    <div class="ScaleBox"
         ref="ScaleBox"
         :style="{
            width: width+'px',
            height: height+'px'
         }">
        <slot></slot>
    </div>
</template>

<style scoped>
    .ScaleBox {
        --scale: 1;
    }

    .ScaleBox {
        position: absolute;
        transform: scale(var(--scale)) translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        transform-origin: 0 0;
        left: 50%;
        top: 50%;
        transition: 0.3s;
        z-index: 999;
        background-image: url("~@/assets/image/1X1.png");
        background-repeat: repeat;
    }
</style>

<script>
    export default {
        name: "ScaleBox",
        props: {},
        data() {
            return {
                scale: 0,
                width: 6400,
                height: 400
            };
        },
        mounted() {
            this.setScale();
            window.addEventListener('resize', this.debounce(this.setScale));
        },
        methods: {
            setScale() {
                this.scale = this.getScale();
                if (this.$refs.ScaleBox) {
                    this.$refs.ScaleBox.style.setProperty("--scale", this.scale);
                }
            },
            getScale() {
                const width = this.width;
                const height = this.height;
                const scaleX = window.innerWidth / width;
                const scaleY = window.innerHeight / height;
                return scaleX < scaleY ? scaleX : scaleY;
            },
            debounce(fn, delay) {
                const delays = delay || 500;
                let timer;
                return function () {
                    const that = this;
                    const args = arguments;
                    if (timer) {
                        clearTimeout(timer);
                    }
                    timer = setTimeout(function () {
                        timer = null;
                        fn.apply(that, args);
                    }, delays);
                }

            }

        }
    }
</script>