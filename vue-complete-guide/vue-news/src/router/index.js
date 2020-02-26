import Vue from 'vue';
import VueRouter from 'vue-router';
import NewView from '../views/NewView';
import AskView from '../views/AskView';
import JobsView from '../views/JobsView';

Vue.use(VueRouter); //이 Vue 또한 import 해야한다. 

export const router = new VueRouter({
    routes: [
        {
            // path : url 주소
            path: '/news',
            // component : url 주소로 갔을 때 표시될 Component
            component: NewView,
        },
        {
            path: '/ask',
            component: AskView,
        },
        {
            path: '/jobs',
            component: JobsView,
        },
    ]
})