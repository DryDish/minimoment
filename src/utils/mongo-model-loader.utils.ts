import { Model } from "mongoose";

// Population Data
import roles from "../models/mongo/population-data/roles.json";
import discountCodes from "../models/mongo/population-data/discount-codes.json";
import monthlyReports from "../models/mongo/population-data/monthly-reports.json";
import subscriptionTypes from "../models/mongo/population-data/subscription-types.json";
import subscriptions from "../models/mongo/population-data/subscriptions.json";
import frames from "../models/mongo/population-data/frames.json";
import sizes from "../models/mongo/population-data/sizes.json";

// Models
import { Role } from "../models/mongo/role";
import { DiscountCode } from "../models/mongo/discount-code";
import { MonthlyReport } from "../models/mongo/monthly-report";
import { SubscriptionType } from "../models/mongo/subscription-type";
import { SubscriptionInterface } from "../models/mongo/subscription";

export const populate = async (): Promise<void> => {
  await populateRoles();
  await populateDiscountCodes();
  await populateMonthlyReports();
  await populateSubscriptionTypes();
  await populateUsers();
};

const populateRoles = async (): Promise<void> =>
  populateCollection(Role, roles);

const populateDiscountCodes = async (): Promise<void> =>
  populateCollection(DiscountCode, discountCodes);

const populateMonthlyReports = async (): Promise<void> =>
  populateCollection(MonthlyReport, monthlyReports);

const populateSubscriptionTypes = async (): Promise<void> =>
  populateCollection(SubscriptionType, subscriptionTypes);

const populateUsers = async (): Promise<void> => {
  const nestedSubsctiptions = subscriptions.map(
    (subscription, index): SubscriptionInterface => {
      return {
        startsAt: new Date(subscription.startsAt),
        endsAt: new Date(subscription.endsAt),
        subscriptionType: subscriptionTypes[index],
      };
    }
  );
};

const populateFrames = async (): Promise<void> => {
  const nested
};

const populatePictureData = async (): Promise<void> => {
  
};

const populateCollection = async (
  collection: Model<any, {}, {}, {}>,
  file: any[]
): Promise<void> => {
  try {
    const isPopulated = (await collection.find()).length !== 0;

    if (!isPopulated) {
      collection.insertMany(file);
    }
  } catch (error) {
    console.error(error);
  }
};
