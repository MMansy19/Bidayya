/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import NotificationSection from './NotificationSection';
import ChangeEmail from './ChangeEmail';
import icon from '../../assets/icon-alert.png';
import discussionIcon from '../../assets/discussion.png';
import usersIcon from '../../assets/users.png';
import {
  SectionData,
  NotificationSettings,
  AllowNotification,
  AlertNotification,
  DiscussionNotification,
  UserNotification,
  Notifications,
  NotificationSettingsBackend,
} from '../../types';
import Section from './Section';
import StyledButton from '../../atoms/common/StyledButton';

const NotificationsSettings: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [settings, setSettings] = useState<Notifications>();
  const [newSettings, setNewSettings] = useState<Notifications>();
  const [initialSettings, setInitialSettings] = useState<Notifications>();

  const [settingsChanged, setSettingsChanged] = useState<boolean>(false);
  const [notificationsDisabled, setNotificationsDisabled] = useState<boolean>();

  const [notificationSettings, setNotificationSettings] =
    useState<AllowNotification[]>();
  const [alertsSettings, setAlertsSettings] = useState<
    AlertNotification & { [key: string]: any }
  >();
  const [discussionsSettings, setDiscussionsSettings] = useState<
    DiscussionNotification & { [key: string]: any }
  >();
  const [userSettings, setUserSettings] = useState<
    UserNotification & { [key: string]: any }
  >();
  useState<SectionData[]>();

  useEffect(() => {
    if (!settings) return;
    setNotificationSettings([
      settings.allowSiteAndEmailNotifications,
      settings.allowNewsAndTipsEmails,
    ]);
    setNotificationsDisabled(
      !settings.allowSiteAndEmailNotifications.isChecked ||
        !initialSettings?.allowSiteAndEmailNotifications.isChecked
    );
    setAlertsSettings(settings.alerts);
    setDiscussionsSettings(settings.discussions);
    setUserSettings(settings.users);
  }, [settings]);

  useEffect(() => {
    if (
      notificationSettings &&
      alertsSettings &&
      discussionsSettings &&
      userSettings
    ) {
      const tmp: Notifications = {
        allowSiteAndEmailNotifications: notificationSettings![0],
        allowNewsAndTipsEmails: notificationSettings![1],
        alerts: alertsSettings!,
        discussions: discussionsSettings!,
        users: userSettings!,
      };
      setNewSettings(tmp);
    }
  }, [notificationSettings, alertsSettings, discussionsSettings, userSettings]);

  useEffect(() => {
    setSettingsChanged(
      JSON.stringify(newSettings) !== JSON.stringify(settings) ||
        notificationSettings?.[0].isChecked !==
          initialSettings?.allowSiteAndEmailNotifications.isChecked
    );
  }, [newSettings]);

  const handleChangeNotifications = (index: number) => {
    if (index === 0) {
      if (notificationSettings?.[0].isChecked) {
        setSettings((initialSettings) => {
          if (initialSettings === undefined) return initialSettings;
          return {
            ...initialSettings,
            allowSiteAndEmailNotifications: {
              ...initialSettings.allowSiteAndEmailNotifications,
              isChecked: false,
            },
          };
        });
        setNotificationsDisabled(true);
      } else {
        setSettings((prev) => {
          if (prev === undefined) return prev;
          return {
            ...prev,
            allowSiteAndEmailNotifications: {
              ...prev.allowSiteAndEmailNotifications,
              isChecked: true,
            },
          };
        });
        setNotificationsDisabled(false);
      }
    } else
      setNotificationSettings((prev) =>
        prev?.map((item, i) =>
          i === index
            ? {
                ...item,
                isChecked: !item.isChecked,
              }
            : item
        )
      );
  };

  const handleChangeAlert = (k1: string, k2: string, k3: string) => {
    setAlertsSettings((prev) => {
      if (prev === undefined) return prev;

      return {
        ...prev,
        [k1]: {
          ...prev[k1],
          settings: {
            ...prev[k1].settings,
            [k2]: {
              ...prev[k1].settings[k2],
              value: {
                ...prev[k1].settings[k2].value,
                [k3]: !prev[k1].settings[k2].value[k3],
              },
            },
          },
        },
      };
    });
  };

  const handleChangeDiscussion = (k1: string, k2: string, k3: string) => {
    setDiscussionsSettings((prev) => {
      if (prev === undefined) return prev;

      return {
        ...prev,
        [k1]: {
          ...prev[k1],
          settings: {
            ...prev[k1].settings,
            [k2]: {
              ...prev[k1].settings[k2],
              value: {
                ...prev[k1].settings[k2].value,
                [k3]: !prev[k1].settings[k2].value[k3],
              },
            },
          },
        },
      };
    });
  };

  const handleChangeUser = (k1: string, k2: string, k3: string) => {
    setUserSettings((prev) => {
      if (prev === undefined) return prev;

      return {
        ...prev,
        [k1]: {
          ...prev[k1],
          settings: {
            ...prev[k1].settings,
            [k2]: {
              ...prev[k1].settings[k2],
              value: {
                ...prev[k1].settings[k2].value,
                [k3]: !prev[k1].settings[k2].value[k3],
              },
            },
          },
        },
      };
    });
  };

  const parseNotificationSettings = (
    data: NotificationSettings
  ): Notifications => {
    return {
      allowSiteAndEmailNotifications: {
        title: 'Allow Site and Email Notifications',
        description: 'Updates on your work or topics you follow',
        isChecked: data.allowSiteAndEmailNotifications,
      },
      allowNewsAndTipsEmails: {
        title: 'Allow news and tips emails',
        description:
          'Updates from Kaggle like new competitions, courses, and features',
        isChecked: data.allowNewsAndTipsEmails,
      },
      alerts: {
        title: 'Alerts About Your Work',
        status: {
          title: 'Status Alerts',
          settings: {
            compitionsYouCanShare: {
              description: 'Competitions you can share',
              value: {
                email: data.alerts.status.compitionsYouCanShare.email,
                site: data.alerts.status.compitionsYouCanShare.site,
              },
            },
            compitionTeamYouJoin: {
              description: 'Competition team you join',
              value: {
                email: data.alerts.status.compitionTeamYouJoin.email,
                site: data.alerts.status.compitionTeamYouJoin.site,
              },
            },
            notebookYouOwn: {
              description: 'Notebook you own',
              value: {
                email: data.alerts.status.notebookYouOwn.email,
                site: data.alerts.status.notebookYouOwn.site,
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
                email: data.alerts.achievements.email,
                site: data.alerts.achievements.site,
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
                email: data.discussions.mentions.following.email,
                site: data.discussions.mentions.following.site,
              },
            },
            notFollowing: {
              description: "@mentions by Kaggle users you don't follow",
              value: {
                email: data.discussions.mentions.notFollowing.email,
                site: data.discussions.mentions.notFollowing.site,
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
                email: data.discussions.comments.newReplies.email,
                site: data.discussions.comments.newReplies.site,
              },
            },
            newTopics: {
              description: "New topics in a forum I'm following",
              value: {
                email: data.discussions.comments.newTopics.email,
                site: data.discussions.comments.newTopics.site,
              },
            },
            upvotes: {
              description: 'Upvotes on one of my topics',
              value: {
                email: data.discussions.comments.upvotes.email,
                site: data.discussions.comments.upvotes.site,
              },
            },
            comments: {
              description: "Comments on topics you've commented on",
              value: {
                email: data.discussions.comments.comments.email,
                site: data.discussions.comments.comments.site,
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
                email: data.discussions.directMessages.email,
                site: data.discussions.directMessages.site,
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
                email: data.users.newFollowers.email,
                site: data.users.newFollowers.site,
              },
            },
          },
        },
      },
    };
  };

  const parseReverseNotificationSettings = (
    data: Notifications
  ): NotificationSettingsBackend => {
    return {
      allowSiteAndEmailNotifications:
        data.allowSiteAndEmailNotifications.isChecked,
      allowNewsAndTipsEmails: data.allowNewsAndTipsEmails.isChecked,
      competitionsYouCanShareSite:
        data.alerts.status.settings.compitionsYouCanShare.value.site,
      competitionsYouCanShareEmail:
        data.alerts.status.settings.compitionsYouCanShare.value.email,
      competitionsYouCanJoinSite:
        data.alerts.status.settings.compitionTeamYouJoin.value.site,
      competitionsYouCanJoinEmail:
        data.alerts.status.settings.compitionTeamYouJoin.value.email,
      notebookAlertsSite: data.alerts.status.settings.notebookYouOwn.value.site,
      notebookAlertsEmail:
        data.alerts.status.settings.notebookYouOwn.value.email,
      achievementsAlertsEmail:
        data.alerts.achievements.settings.achievements.value.email,
      achievementsAlertsSite:
        data.alerts.achievements.settings.achievements.value.site,
      mentionsFollowingSite:
        data.discussions.mentions.settings.following.value.site,
      mentionsFollowingEmail:
        data.discussions.mentions.settings.following.value.email,
      mentionsNotFollowingSite:
        data.discussions.mentions.settings.notFollowing.value.site,
      mentionsNotFollowingEmail:
        data.discussions.mentions.settings.notFollowing.value.email,
      newRepliesSite: data.discussions.comments.settings.newReplies.value.site,
      newRepliesEmail:
        data.discussions.comments.settings.newReplies.value.email,
      newTopicsSite: data.discussions.comments.settings.newTopics.value.site,
      newTopicsEmail: data.discussions.comments.settings.newTopics.value.email,
      topicUpvotesSite: data.discussions.comments.settings.upvotes.value.site,
      topicUpvotesEmail: data.discussions.comments.settings.upvotes.value.email,
      commentsSite: data.discussions.comments.settings.comments.value.site,
      commentsEmail: data.discussions.comments.settings.comments.value.email,
      directMessagesEmail:
        data.discussions.directMessages.settings.directMessages.value.email,
      directMessagesSite:
        data.discussions.directMessages.settings.directMessages.value.site,
      newFollowersEmail:
        data.users.newFollowers.settings.newFollowers.value.email,
      newFollowersSite:
        data.users.newFollowers.settings.newFollowers.value.site,
    };
  };

  const getNotificationSettings = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/current-user/notification-settings`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data: NotificationSettings = await response.json();
        console.log(data.allowSiteAndEmailNotifications);
        setSettings(parseNotificationSettings(data));
        setInitialSettings(parseNotificationSettings(data));
      } else {
        setMessage('Failed to fetch notification settings');
      }
    } catch (error) {
      setMessage('Failed to fetch notification settings');
    }
  };

  const updateNotificationSettings = async () => {
    if (
      notificationSettings?.[0].isChecked !==
        initialSettings?.allowSiteAndEmailNotifications.isChecked &&
      notificationSettings?.[0].isChecked
    ) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/auth/current-user/notification-settings/on-after-offall`,
          {
            method: 'PATCH',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          setMessage('Settings updated successfully');
          const data: NotificationSettings = await response.json();
          setSettings(parseNotificationSettings(data));
          setInitialSettings(parseNotificationSettings(data));
          setNewSettings(parseNotificationSettings(data));
        } else {
          setMessage('Failed to update settings');
          console.log('Failed to update settings');
        }
      } catch (error) {
        setMessage('Failed to update settings');
      }
    } else {
      // console.log(parseReverseNotificationSettings(newSettings!));
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/auth/current-user/notification-settings`,
          {
            method: 'PATCH',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(
              parseReverseNotificationSettings(newSettings!)
            ),
          }
        );

        if (response.ok) {
          setMessage('Settings updated successfully');
          setInitialSettings(newSettings);
          setSettings(newSettings);
        } else {
          setMessage('Failed to update settings');
        }
      } catch (error) {
        setMessage('Failed to update settings');
      }
    }
  };

  useEffect(() => {
    getNotificationSettings();
  }, []);

  useEffect(() => {
    if (message) {
      const timeoutID = setTimeout(() => {
        setMessage('');
      }, 5000);

      return () => clearTimeout(timeoutID);
    }
  }, [message]);

  return (
    <div className="container flex flex-col gap-6">
      {notificationSettings?.[0].isChecked &&
        !initialSettings?.allowSiteAndEmailNotifications.isChecked && (
          <div className="text-2xl font-semibold text-light-blue">
            Save changes first
          </div>
        )}
      {message && (
        <div className="mt-2 text-2xl text-light-blue">{message}</div>
      )}
      <div className="flex max-w-[900px] flex-col justify-between md:flex-col lg:flex-row">
        <div className="flex flex-col gap-6">
          {notificationSettings?.map((notif, index) => (
            <NotificationSection
              key={index}
              title={notif.title}
              description={notif.description}
              isChecked={notif.isChecked}
              onToggle={() => handleChangeNotifications(index)}
              disabled={index === 0 ? false : notificationsDisabled}
            />
          ))}
        </div>
        <ChangeEmail />
      </div>
      <hr className="my-3 border-black" />

      <Section
        icon={icon}
        data={alertsSettings}
        handleToggle={handleChangeAlert}
        disabled={notificationsDisabled}
      />

      <Section
        icon={discussionIcon}
        data={discussionsSettings}
        handleToggle={handleChangeDiscussion}
        disabled={notificationsDisabled}
      />
      <Section
        icon={usersIcon}
        data={userSettings}
        handleToggle={handleChangeUser}
        disabled={notificationsDisabled}
      />
      <StyledButton
        label="Save Changes"
        disabled={!settingsChanged}
        onClick={updateNotificationSettings}
        className="self-end"
      />
    </div>
  );
};

export default NotificationsSettings;
