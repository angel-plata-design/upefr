import { useRef, useState } from 'react';
import { submitInquiry } from '../lib/submitInquiry.mjs';
export function useInquiry(type) {
    const [pending, setPending] = useState(false);
    const [error, setError] = useState('');
    const sending = useRef(false);
    const submit = async (values, options) => {
        if (sending.current) return false;
        sending.current = true;
        setPending(true);
        setError('');
        try { await submitInquiry(type, values, options); return true; }
        catch (reason) { setError(reason.message); return false; }
        finally { sending.current = false; setPending(false); }
    };
    return { submit, pending, error };
}
