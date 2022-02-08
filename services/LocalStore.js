export class LocalStore {

    static Get(key)
    {
        return localStorage?.getItem(key);
    }

    static Set(key, value)
    {
        localStorage?.setItem(key, value);
    }

    static Delete(key)
    {
        localStorage?.removeItem(key);
    }

    static Invalidate()
    {
        localStorage?.clear();
    }
}
