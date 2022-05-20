import { Model, Types } from "mongoose";

// Population Data
import roles from "../models/mongo/population-data/roles.json";
import discountCodes from "../models/mongo/population-data/discount-codes.json";
import monthlyReports from "../models/mongo/population-data/monthly-reports.json";
import subscriptionTypes from "../models/mongo/population-data/subscription-types.json";
import subscriptions from "../models/mongo/population-data/subscriptions.json";
import frames from "../models/mongo/population-data/frames.json";
import sizes from "../models/mongo/population-data/sizes.json";
import paperTypes from "../models/mongo/population-data/paper-types.json";
import pictureData from "../models/mongo/population-data/picture-data.json";
import statuses from "../models/mongo/population-data/statuses.json";
import contactInfo from "../models/mongo/population-data/contact-info.json";
import orderItems from "../models/mongo/population-data/order-items.json";
import orders from "../models/mongo/population-data/orders.json";
import invoices from "../models/mongo/population-data/invoices.json";
import users from "../models/mongo/population-data/users.json";

// Models
import { Role } from "../models/mongo/role";
import { DiscountCode } from "../models/mongo/discount-code";
import { MonthlyReport } from "../models/mongo/monthly-report";
import { SubscriptionType } from "../models/mongo/subscription-type";
import { SubscriptionInterface } from "../models/mongo/subscription";
import { Frame, FrameInterface } from "../models/mongo/frame";
import { PaperType, PaperTypeInterface } from "../models/mongo/paper-type";
import { PictureData } from "../models/mongo/picture-data";
import { Status } from "../models/mongo/status";
import { OrderItemInterface } from "../models/mongo/order-item";
import { Order, OrderInterface } from "../models/mongo/order";
import { Invoice, InvoiceInterface } from "../models/mongo/invoice";
import { User, UserInterface } from "../models/mongo/user";

export const populate = async (): Promise<void> => {
  console.log("Population process started...");

  try {
    await populateRoles();
    await populateDiscountCodes();
    await populateMonthlyReports();
    await populateSubscriptionTypes();
    await populatePictureData();
    await populateStatuses();
    await populateFrames();
    await populatePaperTypes();
    await populateOrders();
    await populateInvoices();
    await populateUsers();

    console.log("Population process finished.");
  } catch (error) {
    console.error("Error populating the Mongo Database", error);
  }
};

const populateRoles = async (): Promise<void> =>
  populateCollection(Role, roles);

const populateDiscountCodes = async (): Promise<void> =>
  populateCollection(DiscountCode, discountCodes);

const populateMonthlyReports = async (): Promise<void> =>
  populateCollection(MonthlyReport, monthlyReports);

const populateSubscriptionTypes = async (): Promise<void> =>
  populateCollection(SubscriptionType, subscriptionTypes);

const populatePictureData = async (): Promise<void> =>
  populateCollection(PictureData, pictureData);

const populateStatuses = async (): Promise<void> =>
  populateCollection(Status, statuses);

const populateUsers = async (): Promise<void> => {
  const ordersToReference = await Order.find();
  const nestedPictureData = await PictureData.find();

  const nestedSubsctiptions = subscriptions.map(
    (subscription, index): SubscriptionInterface => {
      return {
        startsAt: new Date(subscription.startsAt),
        endsAt: new Date(subscription.endsAt),
        subscriptionType: subscriptionTypes[index],
      };
    }
  );

  const usersToPopulate = users.map((user, index): UserInterface => {
    return {
      ...user,
      role: roles[index],
      contactInfo: contactInfo[index],
      subscriptions: nestedSubsctiptions,
      pictureData: nestedPictureData.slice(0, index + 1),
      orderIds: [ordersToReference[index]._id.toString()],
    };
  });

  return populateCollection(User, usersToPopulate);
};

const populateOrders = async (): Promise<void> => {
  const discountCodesToReference = await DiscountCode.find();
  const pictureDataToReference = await PictureData.find();
  const nestedFrames = await Frame.find();
  const nestedPaperTypes = await PaperType.find();

  const nestedOrderItems = orderItems.map(
    (orderItem, index): OrderItemInterface => {
      return {
        ...orderItem,
        frame: nestedFrames[index],
        paperType: nestedPaperTypes[index],
        pictureDataId: pictureDataToReference[index]._id.toString(),
      };
    }
  );

  const ordersToPopulate = orders.map((order, index): OrderInterface => {
    return {
      ...order,
      createdAt: new Date(order.createdAt),
      status: statuses[index],
      billingContactInfo: contactInfo[index],
      discountCodeId: discountCodesToReference[index]._id.toString(),
      orderItems: nestedOrderItems.slice(0, index + 1),
    };
  });

  return populateCollection(Order, ordersToPopulate);
};

const populateInvoices = async (): Promise<void> => {
  const nestedOrders = await Order.find();

  const invoicesToPopulate = invoices.map(
    (invoice, index): InvoiceInterface => {
      return {
        createdAt: new Date(invoice.createdAt),
        order: nestedOrders[index],
      };
    }
  );

  return populateCollection(Invoice, invoicesToPopulate);
};

const populateFrames = async (): Promise<void> => {
  const discountCodesToReference = await DiscountCode.find();

  const framesToPopulate = frames.map((frame, index): FrameInterface => {
    return {
      ...frame,
      size: sizes[index],
      discountCodeId: discountCodesToReference[index]._id.toString(),
    };
  });

  return populateCollection(Frame, framesToPopulate);
};

const populatePaperTypes = async (): Promise<void> => {
  const discountCodesToReference = await DiscountCode.find();

  const paperTypesToPopulate = paperTypes.map(
    (paperType, index): PaperTypeInterface => {
      return {
        ...paperType,
        size: sizes[index],
        discountCodeId: discountCodesToReference[index]._id.toString(),
      };
    }
  );

  return populateCollection(PaperType, paperTypesToPopulate);
};

const populateCollection = async (
  collection: Model<any, {}, {}, {}>,
  file: any[]
): Promise<void> => {
  try {
    const isPopulated = (await collection.find()).length !== 0;

    if (!isPopulated) {
      console.log(`Populating: ${collection.modelName}`);

      await collection.insertMany(file);
    } else {
      console.log(`Collection ${collection.modelName} is already populated`);
    }
  } catch (error) {
    console.error(`Error Populating: ${collection.modelName}`, error);
  }
};
