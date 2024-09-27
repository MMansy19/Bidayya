import {
  CompetitionCreate,
  ActiveCompetition,
  SectionDataCollection,
  Notifications,
} from '../types';
export const initialCompetitions: CompetitionCreate[] = [
  {
    id: '1',
    competitionName: 'Competition Example',
    description: 'Competition Example description',
    companyName: 'Competition Example Company Name',
    price: 1000,
    rules: 'Competition rules',
    competitionUrl: 'https://www.kaggle.com/',
    tags: [
      {
        tag_id: 1,
        tag_name: 'tag1',
        selected: true,
      },
      {
        tag_id: 2,
        tag_name: 'tag2',
        selected: false,
      },
    ],
    submissionDeadline: '2024-12-31',
    isPrivate: false,
    accessType: 'ANYONE',
    files: [],
    coverImage: null,
    joinAvailability: 'anyone',
    termsAccepted: true,
  },
  {
    id: '12345',
    competitionName: 'Competition Name',
    description: 'Scott Crossley',
    companyName: 'Company Name',
    price: 0,
    rules: '',
    competitionUrl: '#',
    submissionDeadline: '2024-12-31',
    isPrivate: false,
    accessType: 'ANYONE',
    files: [],
    coverImage: null,
    tags: [],
    joinAvailability: 'open',
    termsAccepted: true,
  },
];

export const initialActiveCompetitions: ActiveCompetition[] = [
  {
    title: 'Active competition',
    submissionsLeft: 10,
    timeAgo: '2 hours ago',
    rank: '1st',
    totalParticipants: 100,
  },
  {
    title: 'Another active competition',
    submissionsLeft: 5,
    timeAgo: '1 hour ago',
    rank: '2nd',
    totalParticipants: 50,
  },
];

export const passwordRegex: RegExp =
  /^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#$%^&()])[a-zA-Z0-9!@#$%^&()]{8,}$/;

export const passwordCapitalLetterRegex: RegExp = /[A-Z]/;
export const passwordSmallLetterRegex: RegExp = /[a-z]/;
export const passwordNumberRegex: RegExp = /[0-9]/;
export const passwordSpecialCharacterRegex: RegExp = /[!@#$%^&()]/;
export const passwordLengthRegex: RegExp = /^.{8,}$/;

export const emailRegex: RegExp =
  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const notificationsData: Notifications = {
  allowSiteAndEmailNotifications: {
    title: 'Allow Site and Email Notifications',
    description: 'Updates on your work or topics you follow',
    isChecked: true,
  },
  allowNewsAndTipsEmails: {
    title: 'Allow news and tips emails',
    description:
      'Updates from Kaggle like new competitions, courses, and features',
    isChecked: true,
  },
  alerts: {
    title: 'Alerts About Your Work',
    status: {
      title: 'Status Alerts',
      settings: {
        compitionsYouCanShare: {
          description: 'Competitions you can share',
          value: {
            email: true,
            site: true,
          },
        },
        compitionTeamYouJoin: {
          description: 'Competition team you join',
          value: {
            email: true,
            site: true,
          },
        },
        notebookYouOwn: {
          description: 'Notebook you own',
          value: {
            email: true,
            site: true,
          },
        },
      },
    },
    achievements: {
      title: 'Your Bidayya achievements',
      settings: {
        achievements: {
          description:
            "Notifications when you receive a medal or are promoted on Bidayya's progression system.",
          value: {
            email: false,
            site: false,
          },
        },
      },
    },
  },
  discussions: {
    title: 'Discussions with Bidayya Users',
    mentions: {
      title: 'Mentions of you by Kaggle users',
      settings: {
        following: {
          description: '@mentions by Kaggle users you follow',
          value: {
            email: true,
            site: true,
          },
        },
        notFollowing: {
          description: "@mentions by Kaggle users you don't follow",
          value: {
            email: true,
            site: true,
          },
        },
      },
    },
    comments: {
      title: 'Comments and Topics',

      settings: {
        newReplies: {
          description: "New replies in a topic I'm following",
          value: {
            email: true,
            site: true,
          },
        },
        newTopics: {
          description: "New topics in a forum I'm following",
          value: {
            email: true,
            site: true,
          },
        },
        upvotes: {
          description: 'Upvotes on one of my topics',
          value: {
            email: true,
            site: true,
          },
        },
        comments: {
          description: "Comments on topics you've commented on",
          value: {
            email: true,
            site: true,
          },
        },
      },
    },
    directMessages: {
      title: 'Direct Messages from Bidayya Users',
      settings: {
        directMessages: {
          description: 'Allow Bidayya users to email me via profile link',
          value: {
            email: true,
            site: true,
          },
        },
      },
    },
  },
  users: {
    title: 'Users',

    newFollowers: {
      title: 'New Followers',
      settings: {
        newFollowers: {
          description: 'Get notified when someone follows you',
          value: {
            email: true,
            site: true,
          },
        },
      },
    },
  },
};
export const sectionData = {
  notifications: [
    {
      title: 'Allow Site and Email Notifications',
      description: 'Updates on your work or topics you follow',
      isChecked: true,
    },
    {
      title: 'Allow news and tips emails',
      description:
        'Updates from Kaggle like new competitions, courses, and features',
      isChecked: true,
    },
  ],
  alerts: [
    {
      title: 'All',
      settings: {
        email: true,
        site: true,
      },
    },
    {
      title: 'Competitions you can share',
      settings: {
        email: true,
        site: true,
      },
    },
    {
      title: 'Competition team you join',
      settings: {
        email: true,
        site: true,
      },
    },
    {
      title: 'Notebook you own',
      settings: {
        email: true,
        site: true,
      },
    },
  ],
  discussions: [
    {
      title: 'All',
      settings: {
        email: true,
        site: true,
      },
    },
    {
      title: '@mentions by Kaggle users you follow',
      settings: {
        email: true,
        site: true,
      },
    },
    {
      title: "@mentions by Kaggle users you don't follow",
      settings: {
        email: true,
        site: true,
      },
    },
  ],
  comments: [
    {
      title: "New replies in a topic I'm following",
      settings: {
        email: true,
        site: true,
      },
    },
    {
      title: "New topics in a forum I'm following",
      settings: {
        email: true,
        site: true,
      },
    },
    {
      title: 'Upvotes on one of my topics',
      settings: {
        email: true,
        site: true,
      },
    },
    {
      title: "Comments on topics you've commented on",
      settings: {
        email: true,
        site: true,
      },
    },
  ],
  achievements: [
    {
      title:
        "Notifications when you receive a medal or are promoted on Bidayya's progression system.",
      settings: [
        { type: 'email', isChecked: false },
        { type: 'site', isChecked: false },
      ],
    },
  ],
};
