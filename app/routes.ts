export type AppRoutes = {
    '/': undefined;
    '/movie/[id]': {
      id: string;
      title: string;
      poster: string;
      overview: string;
      releaseDate: string;
      voteAverage: number;
    };
  };
  
  declare global {
    namespace ReactNavigation {
      interface RootParamList extends AppRoutes {}
    }
  }