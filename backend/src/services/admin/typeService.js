import db from "../../models/index.js"

export const getAllTypes = async () => {
  return await db.Type.findAll({
    order: [["id", "DESC"]],
  })
}


export const getTypeById = async (id) => {
  const type = await db.Type.findByPk(id)
  if (!type) {
    throw new Error("Type not found")
  }
  return type
}

export const addType = async ({ name, actuator, sensor }) => {
  const actuatorChecks = actuator.map(async (e) => {
    const found = await checkActuator(e)
    if(!found){
      throw new Error(`Actuator id ${e} not found`);
    }
    return found
  })
  const foundActuators = await Promise.all(actuatorChecks);
  actuator = foundActuators.map(actuatorItem => ({
    id: actuatorItem.id,
    name: actuatorItem.name,
    topic: actuatorItem.topic
  }));

  
  const sensorChecks = sensor.map(async (e) => {
    const found = await checkSensor(e)
    if(!found){
      throw new Error(`Sensor id ${e} not found`);
    }
    return found
  })
  
  const foundSensors = await Promise.all(sensorChecks);

  sensor = foundSensors.map(sensorItem => ({
    id: sensorItem.id,
    name: sensorItem.name,
    topic: sensorItem.topic
  }));

  return await db.Type.create({
    name,
    actuator: actuator || null,
    sensor: sensor || null,
  })
}
// UPDATE
export const updateType = async (id, payload) => {
  const type = await db.Type.findByPk(id)
  console.log(payload);
  if (!type) {
    throw new Error("Type not found")
  }

  if(payload.sensor){
    const sensorChecks = payload.sensor.map(async (e) => {
      const found = await checkSensor(e)
      if(!found){
        throw new Error(`Sensor id ${e} not found`);
      }
      return found
    })
    
    const foundSensors = await Promise.all(sensorChecks);

    payload.sensor = foundSensors.map(sensorItem => ({
      id: sensorItem.id,
      name: sensorItem.name,
      topic: sensorItem.topic
    }));
  }

  if(payload.actuator){
    const actuatorChecks = payload.actuator.map(async (e) => {
      const found = await checkActuator(e)
      if(!found){
        throw new Error(`Actuator id ${e} not found`);
      }
      return found
    })
    const foundActuators = await Promise.all(actuatorChecks);
    payload.actuator = foundActuators.map(actuatorItem => ({
      id: actuatorItem.id,
      name: actuatorItem.name,
      topic: actuatorItem.topic
    }));
  }

  await type.update(payload)
  return type
}

// DELETE TYPE
export const deleteType = async (id) => {
  const type = await db.Type.findByPk(id)
  if (!type) {
    throw new Error("Type not found")
  }

  await type.destroy()
  return true
}


async function checkActuator(id) {
  return db.Actuator.findByPk(id,{attributes: ['id','name','topic']});
}
async function checkSensor(id) {
  return db.Sensor.findByPk(id,{attributes: ['id','name','topic']});
}