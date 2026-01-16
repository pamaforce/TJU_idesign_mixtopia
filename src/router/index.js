import Vue from "vue";
import VueRouter from "vue-router";
// 路由懒加载：首屏性能优化
const Home = () => import("../views/Home.vue");
// import axios from 'axios'
Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

const routes = [{
    path: "/",
    name: "Home",
    component: Home,
},
{
    path: "/about",
    name: "About",
    component: () =>
        import("../views/About.vue"),
},
{
    path: "/mixzone",
    name: "Mixzone",
    component: () =>
        import("../views/Mixzone.vue"),
},
{
    path: "/exhibition",
    name: "Exhibition",
    component: () =>
        import("../views/Exhibition.vue"),
},
{
    path: "/exhibition/:category_id",
    name: "ExhibitionI",
    component: () =>
        import("../views/ExhibitionI.vue"),
},
{
    path: "/exhibition/:category_id/:id",
    name: "Detail",
    component: () =>
        import("../views/Detail.vue"),
    props: (route) => ({
        list: route.query.list,
        current: route.query.current,
        from: route.query.from,
    }),
},
{
    path: "/result",
    name: "Result",
    component: () =>
        import("../views/Result.vue"),
    props: (route) => ({ keywords: route.query.keywords }),
},
{
    path: "/search",
    name: "Search",
    component: () =>
        import("../views/Search.vue"),
},
{
    path: "/graduate",
    name: "Graduate",
    component: () =>
        import("../views/Graduate.vue"),
},
{
    path: "/sponsor",
    name: "Sponsor",
    component: () =>
        import("../views/Sponsor.vue"),
},
{
    path: "/lock",
    name: "Lock",
    component: () =>
        import("../views/Lock.vue"),
},
{
    path: "/topika",
    name: "Topika",
    redirect: "/",
},
];
// let once = true,
//     time = 0;
const router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,
});

export default router;