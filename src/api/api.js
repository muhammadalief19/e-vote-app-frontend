import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const getToken = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_APIURL}/auth/token`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return response;
};

export const getCandidateAuth = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_APIURL}/auth/token-user-auth`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return response.data.user;
};

export const refreshToken = async () => {
  const response = await getToken();
  return response.data.user;
};

export const getProvinsi = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_APIREGIONAL}/provinsi?api_key=${
      import.meta.env.VITE_APP_APIKEY
    }`
  );

  return response.data.data;
};

export const getKota = async (prov) => {
  const response = await axios.get(
    `${
      import.meta.env.VITE_APP_APIREGIONAL
    }/kota?provinsi_id=${prov}&&api_key=${import.meta.env.VITE_APP_APIKEY}`
  );

  return response.data.data;
};

export const getKecamatan = async (kab) => {
  const response = await axios.get(
    `${
      import.meta.env.VITE_APP_APIREGIONAL
    }/kecamatan?kota_id=${kab}&&api_key=${import.meta.env.VITE_APP_APIKEY}`
  );

  return response.data.data;
};

export const getDesa = async (kec) => {
  const response = await axios.get(
    `${
      import.meta.env.VITE_APP_APIREGIONAL
    }/kelurahan?kecamatan_id=${kec}&&api_key=${import.meta.env.VITE_APP_APIKEY}`
  );
  return response.data.data;
};

// users procedure
export const getUsers = async (token) => {
  const response = await axios.get(`${import.meta.env.VITE_APP_APIURL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data);
  return response.data.payload;
};

export const getUsersById = async (token, uuid) => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_APIURL}/users/${uuid}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.payload;
};

export const createUser = async (token, data) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_APIURL}/users`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.msg;
};

export const updateUser = async (token, data, uuid) => {
  const response = await axios.patch(
    `${import.meta.env.VITE_APP_APIURL}/users/${uuid}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.msg;
};

export const deleteUsers = async (token, uuid) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_APP_APIURL}/users/${uuid}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.msg;
};

export const getCandidate = async (token) => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_APIURL}/users/candidate`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response.data);
  return response.data.payload;
};

// api candidate
export const getCandidates = async (token) => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_APIURL}/candidate`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response.data);
  return response.data.payload;
};

export const getCandidateById = async (token, uuid) => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_APIURL}/candidate/${uuid}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response.data);
  return response.data.payload;
};

export const createCandidate = async (token, data) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_APIURL}/candidate`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.msg;
};

export const updateCandidate = async (token, data, uuid) => {
  const response = await axios.patch(
    `${import.meta.env.VITE_APP_APIURL}/candidate/${uuid}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.msg;
};

export const updateVisiMisi = async (token, data, uuid) => {
  const response = await axios.patch(
    `${import.meta.env.VITE_APP_APIURL}/candidate/visi-misi/${uuid}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.msg;
};

export const deleteCandidate = async (token, uuid) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_APP_APIURL}/candidate/${uuid}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.msg;
};

// api suksesi
export const getSuksesi = async (token) => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_APIURL}/suksesi`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.payload;
};

export const getSuksesiById = async (token, id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_APIURL}/suksesi/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.payload;
};

export const createSukesi = async (token, data) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_APIURL}/suksesi`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.msg;
};

export const updateSukesi = async (token, data, id) => {
  const response = await axios.patch(
    `${import.meta.env.VITE_APP_APIURL}/suksesi/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.msg;
};

export const deleteSuksesi = async (token, id) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_APP_APIURL}/suksesi/${id}`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.msg;
};

// api voting
export const getVotes = async (token) => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_APIURL}/voting`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.payload;
};

export const getVoteById = async (token, id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_APIURL}/voting/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.payload;
};

export const createVote = async (token, data) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_APIURL}/voting`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.msg;
};

export const resultVote = async (token, suksesi, kandidat) => {
  const response = await axios.get(
    `${
      import.meta.env.VITE_APP_APIURL
    }/validate/results?key1=${suksesi}&key2=${kandidat}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.payload;
};

// api validate
export const validateVoted = async (token, user, suksesi) => {
  const response = await axios.get(
    `${
      import.meta.env.VITE_APP_APIURL
    }/validate/voted?key1=${user}&key2=${suksesi}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.payload;
};

export const countedData = async (token) => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_APIURL}/validate/count`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.payload;
};

export const countedDataStat = async (token) => {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_APIURL}/validate/count-data-stat`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.payload;
};
