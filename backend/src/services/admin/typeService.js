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
  if (!name) throw new Error("Name is required")


  const actuatorChecks = actuator.map(async (e) => {
    const found = await checkActuator(e.name)
    if(!found){
      throw new Error(`Actuator not found: ${e.name}`);
    }
  })
  
  await Promise.all(actuatorChecks);
  
  const sensorChecks = sensor.map(async (e) => {
    const found = await checkSensor(e.name)
    if(!found){
      throw new Error(`Sensor not found: ${e.name}`);
    }
  })

  await Promise.all(sensorChecks);

  return await db.Type.create({
    name,
    actuator: actuator || null,
    sensor: sensor || null,
  })
}

// UPDATE TYPE
export const updateType = async (id, payload) => {
  const type = await db.Type.findByPk(id)
  console.log(payload);
  if (!type) {
    throw new Error("Type not found")
  }

  if(payload.sensor){
    const sensorChecks = payload.sensor.map(async (e) => {
      const found = await checkSensor(e.name)
      if(!found){
        throw new Error(`Sensor not found: ${e.name}`);
      }
    })

    await Promise.all(sensorChecks);
  }

  if(payload.actuator){
    const actuatorChecks = payload.actuator.map(async (e) => {
      const found = await checkActuator(e.name)
      if(!found){
        throw new Error(`Actuator not found: ${e.name}`);
      }
    })
    
    await Promise.all(actuatorChecks);
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


async function checkActuator(name) {
  return db.Actuator.findOne({where: {name}});
}
async function checkSensor(name) {
  return db.Sensor.findOne({where: {name}});
}