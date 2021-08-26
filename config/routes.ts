export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      // chua dang nhap
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },

      // da dang nhap
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/manageTopic',
              },
              {
                path: '/welcome', 
                redirect: '/manageTopic',
              },
           
              // {
              //   path: '/admin',
              //   name: 'admin',
              //   icon: 'crown',
              //   component: './Admin',
              //   authority: ['admin'],
              //   routes: [
              //     {
              //       path: '/admin/sub-page',
              //       name: 'sub-page',
              //       icon: 'smile',
              //       component: './Welcome',
              //       authority: ['admin'],
              //     },
              //   ],
              // },
              
              {
                name: 'Manage Topic',
                icon: 'Tags',
                path: '/manageTopic',
                component: './Topic/ManagePage',
              },
              {
                name: 'Manage Event',
                icon: 'Schedule',
                path: '/manageEvent',
                component: './Event/ManageEventPage',
              },
              {
                name: 'Manage Exhibit',
                icon: 'Star',
                path: '/manageExhibit',
                component: './Exhibit/ManageExhibitPage',
              },
              {
                name: 'Manage Room',
                icon: 'compass',
                path: '/manageRoom',
                component: './Room/ManageRoomPage',              
              },
              
              {
                name: 'Manage Feedback',
                icon: 'Smile',
                path: '/manageFeedback',
                component: './Feedback/ManageFeedbackPage',              
              },
              {
                component: './404',
              },

            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
