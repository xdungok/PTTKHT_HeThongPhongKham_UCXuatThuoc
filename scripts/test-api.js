const fetch = require('node-fetch');

async function run() {
  try {
    console.log('Sanity tests:');
    const base = 'http://localhost:3000';
    console.log('- GET / ->', await (await fetch(base)).status);
    const patient = await fetch(`${base}/xuat/api/patient/012345678910`);
    console.log('- GET /xuat/api/patient/012345678910 ->', patient.status);
    const pt = await patient.json();
    console.log('  patient:', pt.hoTen, pt.cccd);

    const hs = await fetch(`${base}/xuat/api/hoso/${pt.maHoSo}`);
    console.log('- GET /xuat/api/hoso/:ma ->', hs.status);

    const dt = await fetch(`${base}/xuat/api/donthuoc/DT-001`);
    console.log('- GET /xuat/api/donthuoc/DT-001 ->', dt.status);
    const dtj = await dt.json();
    console.log('  donthuoc items:', dtj.chiTiet.length);

    console.log('Sanity checks done. If any status !== 200, start server and try again.');
  } catch (err) {
    console.error('Sanity tests error:', err.message);
  }
}

run();
