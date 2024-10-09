import { InlineKeyboardMarkup } from 'node-telegram-bot-api';

type RouteOptions = {
  reply_markup: InlineKeyboardMarkup,
};

type Route = {
  id: string;
  title: string;
  description: string;
  routeOptions?: RouteOptions;
};

function RouteStack() {
  let routes: Route[] = [];
  let currentIndex: number = -1;

  const clearStack = () => {
    routes = [];
    currentIndex = -1;
  };

  const addRoute = (route: Route) => {
    if (currentIndex < routes.length - 1) {
      routes = routes.slice(0, currentIndex + 1);
    }

    routes.push(route);
    currentIndex++;
  };

  const getCurrentRoute = (): Route | null => {
    return routes[currentIndex] || null;
  };

  const goBack = (): Route | null => {
    if (currentIndex > 0) {
      currentIndex--;
      return routes[currentIndex];
    }

    return null;
  }

  const goForward = (): Route | null => {
    if (currentIndex < routes.length - 1) {
      currentIndex++;
      return routes[currentIndex];
    }

    return null;
  }

  return {
    clearStack,
    addRoute,
    getCurrentRoute,
    goBack,
    goForward,
  };
}

export {
  Route,
  RouteStack,
};
