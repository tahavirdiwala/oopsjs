exports = async function(changeEvent) {

    const docId = changeEvent.documentKey._id;

const serviceName = "Cluster0";
const databaseName = "oops";
const targetCollection = context.services.get(serviceName).db(databaseName).collection(changeEvent.ns.coll);
const counterCollection = context.services.get(serviceName).db(databaseName).collection("counters");

const counter = await counterCollection.findOneAndUpdate(
{ \_id: changeEvent.ns },
{ $inc: { seq_val: 1 }},
{ returnNewDocument: true, upsert : true}
);

// doc[`${changeEvent.ns.coll}Id`] = counter.seq_val;
const updateRes = await targetCollection.updateOne({\_id: docId},{ $set: {[`${changeEvent.ns.coll}Id`]: parseInt(counter.seq_val) }});
  console.log(`Updated ${JSON.stringify(changeEvent.ns)} with counter ${counter.seq_val} result: ${JSON.stringify(updateRes)}`);

};
