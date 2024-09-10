import AddPostPage from "../pages/add-post.page";
import HomePage from "../pages/home.page";
import PostsPage from "../pages/posts.page";

const routes = {
  '/': {
    linkLabel: 'Home',
    component: HomePage,
  },
  '/posts': {
    linkLabel: 'Posts',
    component: PostsPage,
  },
  '/new': {
    linkLabel: 'New Post',
    component: AddPostPage,
  },
} as const;

type RouteKeys = keyof typeof routes;
type Route = (typeof routes)[RouteKeys];

function getRoute(route: RouteKeys) {
  return routes[route] as Route;
}

export { routes, getRoute, type RouteKeys, type Route };