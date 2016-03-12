
export default function request (path, headers) {
  return fetch(path)
    .then(res => res.json());
};
