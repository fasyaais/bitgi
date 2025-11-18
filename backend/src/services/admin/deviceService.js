import db from "../../models/index.js";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import QRCode from "qrcode";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import config from "../../config/index.js";

const __filename = fileURLToPath(import.meta.url);
const currentDir = path.dirname(__filename);
const __dirname = path.join(currentDir, "..", "..");

// Get All Device
export const getAllDevices = async () => {
  return await db.Device.findAll({
    order: [["createdAt", "DESC"]],
  });
};

// Get Device By Id
export const getDeviceById = async (id) => {
  const device = await db.Device.findByPk(id);
  if (!device) throw new Error("Device not found");
  return device;
};

// Update Device
export const updateDevice = async (id, payload) => {
  const device = await db.Device.findByPk(id);
  if (!device) throw new Error("Device not found");
  await device.update(payload);
  return device;
};

// Delete Device
export const deleteDevice = async (id) => {
  const device = await db.Device.findByPk(id);
  if (!device) throw new Error("Device not found");
  await device.destroy();
  return device;
};

export const registerDevice = async ({ type }) => {
  const typeData = await db.Type.findOne({ where: { name: type } });
  if (typeData == null) {
    throw Error("Type not found");
  }
  
  const typeId = typeData.id;
  const now = new Date();
  const stringConcat =
    `${typeData.name}` +
    "-" +
    now.getFullYear() +
    now.getMonth() +
    now.getDate() +
    now.getMinutes() +
    now.getSeconds();
  const id = `DEV-${stringConcat}`;
  const existingDevice = await db.Device.findByPk(id);
  console.log(existingDevice);
  if (existingDevice) {
    throw Error("Device existing");
  }

  const token = crypto.randomBytes(32).toString("hex");
  const data = await db.Device.create({
    id,
    token,
    type: typeId,
  });

  return { device_id: data.id, token: data.token };
};

export const createQrCode = async ({ device_id, token }) => {
  const data = await db.Device.findOne({
    where: {
      id: device_id,
      token,
    },
  });
  if (data == null) {
    throw new Error("Device not found");
  }
  const fileName = `qr_${device_id}.png`;
  const imageDirPath = path.join(__dirname, "public", "images");
  const filePath = path.join(imageDirPath, fileName);

  if (!fs.existsSync(imageDirPath)) {
    fs.mkdirSync(imageDirPath, { recursive: true });
  }
  const dataQrCode = { device_id, token };
  const dataToString = JSON.stringify(dataQrCode);

  try {
    const result = await generateQrCode(filePath, dataToString, fileName);
    await db.Device;
    return result;
  } catch (error) {
    throw Error(error);
  }
};

export const registerService = async ({ username, fullname, password }) => {
  const alreadyUser = await db.User.findOne({ where: { username } });
  if (alreadyUser) {
    throw new Error("Username already taken");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await db.User.create({
    username,
    fullname,
    password: hashedPassword,
  });
  return user;
};

const generateQrCode = (filePath, data, fileName) => {
  return new Promise((resolve, reject) => {
    QRCode.toFile(filePath, data, (err) => {
      if (err) {
        console.error(err);
        return reject("Cannot make qrcode");
      }

      const imgUrl = `${config.APP_HOST}:${config.APP_PORT}/images/${fileName}`;
      resolve({ image_url: imgUrl });
    });
  });
};
