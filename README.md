# CritiqueCore � ��6

Node.js 22.22+.

������������: `npm ci`.
� ������� �������: `npm run api:dev`.
� �������: `npm run dev`.
³������ http://localhost:5176.

��������� ���� �������. ��������� ������� ������, ������ ���� �� ����� �������. ���� ������ tools/dev-api.mjs � tools/data/db.json (�� �������� �� Git). ��� ����������� � ����� ������� � ���������� ������ ����� ���� ���� �����������. �� ��������� ��������� ������ ��� ������������ ���������, �� production-������ ��7.

API: GET /api/auth/me, POST /api/auth/register, /api/auth/login, /api/auth/logout; GET/POST /api/topics; GET /api/topics/:id; POST /api/topics/:id/comments �� /resolve. ����������� � HttpOnly cookie. �볺�� �������� HTTP-������ � ������ ������� �������. ��� ������ API ������������ VITE_API_URL ��� API_PROXY_TARGET �� ������� .env.example; ������ ������� ����������� ��� ��������.

useResource � GET �� ���������� ������; useMutation � POST � ���� ����������; useAuth � ����, ���������, �����; AuthProvider � �������� ����������. ������� ���� �� ����� � ����������. ����� ���������� �� ������. �������� ����: npm run check.
