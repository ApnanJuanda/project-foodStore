const csv = require("csvtojson");
const path = require("path");

//getAll Provinsi
const getProvinsi = async (req, res, next) => {
  const db_provinsi = path.resolve(__dirname, "./data/provinces.csv");

  try {
    const data = await csv().fromFile(db_provinsi);
    return res.json(data);
  } catch (err) {
    return res.json({
      error: 1,
      message: "Tidak bisa mengambil data provinsi, hubungi administrator",
    });
  }
};

//get Kabupaten by kodeProvinsi
const getKabupaten = async (req, res, next) => {
  const db_kabupaten = path.resolve(__dirname, "./data/regencies.csv");
  try {
    let { kode_induk } = req.query;
    const data = await csv().fromFile(db_kabupaten);

    if (!kode_induk) return res.json(data);

    return res.json(
      data.filter((kabupaten) => kabupaten.kode_provinsi === kode_induk)
    ); //data dimisalkan namanya kabupaten
  } catch (err) {
    return res.json({
      error: 1,
      message: "Tidak bisa mengambil data kabupaten, hubungi administrator",
    });
  }
};

const getKecamatan = async (req, res, next) => {
  const db_kecamatan = path.resolve(__dirname, "./data/districts.csv");
  try {
    let { kode_induk } = req.query;
    const data = await csv().fromFile(db_kecamatan);
    if (!kode_induk) return res.json(data);

    return res.json(
      data.filter((kecamatan) => kecamatan.kode_kabupaten === kode_induk)
    );
  } catch (err) {
    return res.json({
      error: 1,
      message: "Tidak bisa mengambil data kecamatan, hubungi administrator",
    });
  }
};

const getDesa = async (req, res, next) => {
  const db_desa = path.resolve(__dirname, "./data/villages.csv");
  try {
    let { kode_induk } = req.query;
    const data = await csv().fromFile(db_desa);
    if (!kode_induk) return res.json(data);

    return res.json(data.filter((desa) => desa.kode_kecamatan === kode_induk));
  } catch (err) {
    return res.json({
      error: 1,
      message: "Tidak bisa mengambil data kecamatan, hubungi administrator",
    });
  }
};

module.exports = { getProvinsi, getKabupaten, getKecamatan, getDesa };
