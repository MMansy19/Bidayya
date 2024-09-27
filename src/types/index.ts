export type CompetitionCreate = {
  id?: string;
  competitionName: string;
  description: string;
  companyName: string;
  price: number;
  rules: string | undefined;
  competitionUrl: string;
  submissionDeadline: string;
  isPrivate: boolean;
  accessType: 'ANYONE' | 'ONLY_WITH_LINK' | 'RESTRICTED';
  files: File[];
  coverImage: File | null;
  tags: Tag[];
  joinAvailability: string;
  termsAccepted: boolean;
  state?: string;
};

export type CompetitionDetails = {
  id: number;
  name: string;
  competition_url: string;
  description: string;
  company_id: number;
  price: number;
  rules: string;
  host_id: number;
  files: string[];
  cover_image: string;
  submission_deadline: string;
  created_at: string;
  is_accepted: boolean;
  is_active: boolean;
  is_private: boolean;
  submission_id_winner: null | number;
  access_type: 'ANYONE' | 'ONLY_WITH_LINK' | 'RESTRICTED';
  company: {
    company_id: number;
    company_email: string;
    company_name: string;
    user_id: number;
  };
};

export type Tag = {
  tag_id: number;
  tag_name: string;
  selected: boolean;
};

export type ActiveCompetition = {
  title: string;
  submissionsLeft: number;
  timeAgo: string;
  rank: string;
  totalParticipants: number;
};

export type ButtonVariant =
  | 'primary'
  | 'primarySmall'
  | 'secondary'
  | 'secondaryOutline'
  | 'danger'
  | 'pdf';

enum Role {
  ADMIN,
  USER,
  EMPLOYEE,
}

enum ProgressLevel {
  Grandmaster,
  Master,
  Expert,
  Contributor,
  Novice,
}

export type User = {
  id: number;
  full_name: String;
  username: String;
  email: String;
  password: String;
  created_at: String;
  deleted_at: String;
  organisation: String;
  country: String;
  competition_gold_medals: number;
  competition_bronze_medals: number;
  competition_silver_medals: number;
  competition_level: ProgressLevel;
  discussion_gold_medals: number;
  discussion_bronze_medals: number;
  discussion_silver_medals: number;
  discussion_level: ProgressLevel;
  competition_points: number;
  discussion_points: number;
  competition_won: String;
  role: Role;
};

export type Setting = {
  type: 'email' | 'site';
  isChecked: boolean;
};

export type SectionData = {
  title: string;
  description?: string;
  settings: Setting[];
};

export type SectionDataCollection = {
  notifications: SectionData[];
  alerts: SectionData[];
  discussions: SectionData[];
  comments: SectionData[];
  achievements: SectionData[];
};

export type NotificationSetting = {
  email: boolean;
  site: boolean;
};

export type NotificationSettings = {
  allowSiteAndEmailNotifications: boolean;
  allowNewsAndTipsEmails: boolean;
  alerts: {
    status: {
      compitionsYouCanShare: NotificationSetting;
      compitionTeamYouJoin: NotificationSetting;
      notebookYouOwn: NotificationSetting;
    };
    achievements: NotificationSetting;
  };
  discussions: {
    mentions: {
      following: NotificationSetting;
      notFollowing: NotificationSetting;
    };
    comments: {
      newReplies: NotificationSetting;
      newTopics: NotificationSetting;
      upvotes: NotificationSetting;
      comments: NotificationSetting;
    };
    directMessages: NotificationSetting;
  };
  users: {
    newFollowers: NotificationSetting;
  };
};

export type NotificationSettingsBackend = {
  allowSiteAndEmailNotifications: boolean;
  allowNewsAndTipsEmails: boolean;
  competitionsYouCanShareSite: boolean;
  competitionsYouCanShareEmail: boolean;
  competitionsYouCanJoinSite: boolean;
  competitionsYouCanJoinEmail: boolean;
  notebookAlertsSite: boolean;
  notebookAlertsEmail: boolean;
  achievementsAlertsSite: boolean;
  achievementsAlertsEmail: boolean;
  mentionsFollowingSite: boolean;
  mentionsFollowingEmail: boolean;
  mentionsNotFollowingSite: boolean;
  mentionsNotFollowingEmail: boolean;
  newRepliesSite: boolean;
  newRepliesEmail: boolean;
  newTopicsSite: boolean;
  newTopicsEmail: boolean;
  topicUpvotesSite: boolean;
  topicUpvotesEmail: boolean;
  commentsSite: boolean;
  commentsEmail: boolean;
  directMessagesSite: boolean;
  directMessagesEmail: boolean;
  newFollowersSite: boolean;
  newFollowersEmail: boolean;
};

export type AllowNotification = {
  title: string;
  description: string;
  isChecked: boolean;
};

export type AlertNotification = {
  title: string;
  status: {
    title: string;
    settings: {
      compitionsYouCanShare: {
        description: string;
        value: {
          email: boolean;
          site: boolean;
        };
      };
      compitionTeamYouJoin: {
        description: string;
        value: {
          email: boolean;
          site: boolean;
        };
      };
      notebookYouOwn: {
        description: string;
        value: {
          email: boolean;
          site: boolean;
        };
      };
    };
  };
  achievements: {
    title: string;
    settings: {
      achievements: {
        description: string;
        value: {
          email: boolean;
          site: boolean;
        };
      };
    };
  };
};

export type DiscussionNotification = {
  title: string;
  mentions: {
    title: string;
    settings: {
      following: {
        description: string;
        value: {
          email: boolean;
          site: boolean;
        };
      };
      notFollowing: {
        description: string;
        value: {
          email: boolean;
          site: boolean;
        };
      };
    };
  };
  comments: {
    title: string;
    settings: {
      newReplies: {
        description: string;
        value: {
          email: boolean;
          site: boolean;
        };
      };
      newTopics: {
        description: string;
        value: {
          email: boolean;
          site: boolean;
        };
      };
      upvotes: {
        description: string;
        value: {
          email: boolean;
          site: boolean;
        };
      };
      comments: {
        description: string;
        value: {
          email: boolean;
          site: boolean;
        };
      };
    };
  };
  directMessages: {
    title: string;
    settings: {
      directMessages: {
        description: string;
        value: {
          email: boolean;
          site: boolean;
        };
      };
    };
  };
};

export type UserNotification = {
  title: string;
  newFollowers: {
    title: string;
    settings: {
      newFollowers: {
        description: string;
        value: {
          email: boolean;
          site: boolean;
        };
      };
    };
  };
};

export type Notifications = {
  allowSiteAndEmailNotifications: AllowNotification;
  allowNewsAndTipsEmails: AllowNotification;
  alerts: AlertNotification;
  discussions: DiscussionNotification;
  users: UserNotification;
};

export type DashboardProps = {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  hover: boolean;
  setHover: React.Dispatch<React.SetStateAction<boolean>>;
};

export type AdminCompetition = {
  id: number;
  name: string;
  competition_url: string;
  description: string;
  company_id: number;
  price: number;
  rules: string;
  host_id: number;
  files: string[];
  cover_image: string;
  submission_deadline: string;
  created_at: string;
  is_accepted: any;
  is_active: boolean;
  is_private: boolean;
  submission_id_winner: any;
  access_type: 'ANYONE' | 'ONLY_WITH_LINK' | 'RESTRICTED';
  company: {
    company_id: number;
    company_email: string;
    company_name: string;
    user_id: number;
  };
};

export type RetrievedCompetition = {
  id: number;
  name: string;
  competition_url: string;
  description: string;
  company_id: number;
  price: number;
  rules: string;
  host_id: number;
  files: string[];
  cover_image: string;
  submission_deadline: string;
  created_at: string;
  is_accepted: boolean; // Changed from 'any' to 'boolean'
  is_active: boolean;
  is_private: boolean;
  submission_id_winner: number | null; // Changed from 'any' to 'number | null'
  access_type: 'ANYONE' | 'ONLY_WITH_LINK' | 'RESTRICTED';
  company: {
    company_id: number;
    company_email: string;
    company_name: string;
    user_id: number;
  };
};
export type DashboardUser = {
  id: number;
  full_name: string;
  email: string;
  created_at: string;
};

export type FeedbackMessage = {
  contact: string;
  content: string;
  createdAt: string;
};

export type Submission = {
  id: number;
  competition_id: number;
  user_id: number;
  title: string;
  description: string;
  files: string[];
  cover_image: string;
  created_at: string;
  updated_at: string | null;
  is_rated: boolean;
  medal_type: 'GOLD' | 'SILVER' | 'BRONZE' | null;
  isWinner: boolean;
  is_private: boolean;
  _count: {
    submissionVotes: number;
  };
  user: {
    id: number;
    email: string;
    username: string;
    full_name: string;
    is_active: boolean;
  };
};

export interface Topic {
  id: number;
  user_id: number;
  competition_id: number;
  created_at: string;
  content: string;
  name: string;
  image_path: null | string;
  medal_type: null | 'GOLD' | 'SILVER' | 'BRONZE';
  user: {
    id: number;
    email: string;
    username: string;
    full_name: string;
    is_active: boolean;
  };
  comments: Comment[];
  topicVotes: {
    id: number;
  }[];
  _count: {
    comments: number;
    topicVotes: number;
  };
  upvotedByMe: boolean;
}

export interface Comment {
  id: number;
  user_id: number;
  parent_comment_id: null | number;
  parent_topic_id: number;
  content: string;
  image_path: null | string;
  created_at: string;
  medal_type: null | 'GOLD' | 'SILVER' | 'BRONZE';
  _count: {
    comments: number;
    commentVotes: number;
  };
  user: {
    id: number;
    email: string;
    username: string;
    full_name: string;
    is_active: boolean;
  };
  comments: Comment[];
}
