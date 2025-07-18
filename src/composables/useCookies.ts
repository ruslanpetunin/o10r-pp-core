export default function() {
  function get(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }

  function set(name: string, value: string, options: {
    expires?: Date | number; // Date or days
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'Strict' | 'Lax' | 'None';
  } = {}) {
    let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (options.expires) {
      const expires = options.expires instanceof Date
        ? options.expires.toUTCString()
        : new Date(Date.now() + options.expires * 864e5).toUTCString();
      cookie += `; expires=${expires}`;
    }

    if (options.path) cookie += `; path=${options.path}`;
    if (options.domain) cookie += `; domain=${options.domain}`;
    if (options.secure) cookie += `; secure`;
    if (options.sameSite) cookie += `; samesite=${options.sameSite}`;

    document.cookie = cookie;
  }

  function remove(name: string, path = '/') {
    set(name, '', { expires: -1, path });
  }

  function getAll(): Record<string, string> {
    return document.cookie
      .split('; ')
      .reduce((acc, cookieStr) => {
        const [key, value] = cookieStr.split('=');
        if (key && value !== undefined) {
          acc[decodeURIComponent(key)] = decodeURIComponent(value);
        }
        return acc;
      }, {} as Record<string, string>);
  }

  return {
    get,
    set,
    remove,
    getAll,
  };
}
