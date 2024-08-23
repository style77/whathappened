import React, { useState, useEffect } from "react";
import { HttpError, useTable } from "@refinedev/core";
import { useModalForm } from "@refinedev/react-hook-form";
import { Layout } from "../../components/dashboard/Layout";
import { IKey } from "../../interfaces";
import { MinusIcon } from "@heroicons/react/24/outline";

export const Keys: React.FC = () => {
    const { tableQueryResult } = useTable<IKey>({
        resource: "keys"
    });

    const {
        formState: { errors },
        refineCore: { onFinish, formLoading },
        modal: { visible: visibleKeyCreateModal, close: closeKeyCreateModal, show: showKeyCreateModal },
        register,
        setValue,
        getValues,
        handleSubmit: handleKeyCreate,
        saveButtonProps,
    } = useModalForm<IKey, HttpError, IKey>({
        refineCoreProps: { action: "create", resource: "keys" },
    });

    useEffect(() => {
        // Initialize allowed_domains to an empty array if it's not already set
        if (!getValues("allowed_domains")) {
            setValue("allowed_domains", []);
        }
    }, [setValue, getValues]);

    const handleKeyCreation = handleKeyCreate((values: IKey) => {
        console.log(values); // Check if allowed_domains is correctly populated
        onFinish(values);
    });

    return (
        <Layout>
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center mb-4">
                    <button className="btn bg-white z-[1]" onClick={() => showKeyCreateModal()}>
                        Create Key
                    </button>
                </div>

                <table className="table w-full border bg-black/25 border-white/10 border-separate rounded-xl text-gray-300">
                    <thead>
                        <tr className="text-white">
                            <th>Key</th>
                            <th>Created At</th>
                            <th>Allowed Domains</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="relative z-[100]">
                        <tr key="xd">
                            <td>xd</td>
                            <td>17.08.2024 22:18</td>
                            <td>test.pl, test.eu</td>
                            <td className="flex flex-row gap-2">
                                <button className="" onClick={() => showEditModal(record.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                    </svg>
                                </button>
                                <button className="" onClick={() => handleDelete(record.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                        <tr key="xd">
                            <td>xd</td>
                            <td>17.08.2024 22:18</td>
                            <td>test.pl, test.eu</td>
                            <td className="flex flex-row gap-2">
                                <button className="" onClick={() => showEditModal(record.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                    </svg>
                                </button>
                                <button className="" onClick={() => handleDelete(record.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                        <tr key="xd">
                            <td>xd</td>
                            <td>17.08.2024 22:18</td>
                            <td>test.pl, test.eu</td>
                            <td className="flex flex-row gap-2">
                                <button className="" onClick={() => showEditModal(record.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                    </svg>
                                </button>
                                <button className="" onClick={() => handleDelete(record.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                        {tableQueryResult.data?.data.map((record) => (
                            <tr key={record.key}>
                                <td>{record.key}</td>
                                <td>{new Date(record.createdAt).toLocaleString()}</td>
                                <td>{record.allowed_domains.join(", ")}</td>
                                <td>
                                    {/* Action buttons */}
                                </td>
                                {/* <td>
                                    <button className="btn btn-secondary btn-sm" onClick={() => showEditModal(record.id)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(record.id)}>
                                        Delete
                                    </button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Modal
                    visible={visibleKeyCreateModal}
                    onClose={closeKeyCreateModal}
                    title="Create Key"
                    description="Fill in the form below to create a new key."
                >
                    <Form onSubmit={handleKeyCreation}>
                        <AllowedDomainsField
                            domainsName="allowed_domains"
                            register={register}
                            setValue={setValue}
                            getValues={getValues}
                        />
                        <div className="modal-action">
                            <button className="btn bg-white z-[1]" type="submit">
                                Create Key
                            </button>
                        </div>
                    </Form>
                </Modal>
            </div>
        </Layout>
    );
};

const Modal: React.FC<{
    visible: boolean;
    onClose: () => void;
    title: string;
    description: string;
    buttonLabel?: string;
    children: React.ReactNode;
}> = ({ visible, onClose, title, description, children }) => {
    if (!visible) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box bg-black custom-bg before:content-[''] before:bg-transparent before:bg-repeat before:bg-[length:182px] before:opacity-[0.12] before:top-[0] before:left-[0] before:absolute before:h-full before:w-full">
                <button className="btn btn-sm btn-circle btn-ghost text-white absolute right-4 top-6 z-[1a]" onClick={onClose}>✕</button>
                <h2 className="font-bold text-lg text-white">{title}</h2>
                {description && (
                    <h3 className="text-sm text-gray-400 mb-4">{description}</h3>
                )}
                {children}
            </div>
        </div>
    );
};

const Form: React.FC<{ onSubmit: (values: any) => void; children: React.ReactNode }> = ({ onSubmit, children }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const values = Object.fromEntries(formData.entries());
        onSubmit(values);
    };

    return (
        <form onSubmit={handleSubmit}>
            {children}
        </form>
    );
};

const AllowedDomainsField: React.FC<{ domainsName: string, register: any, setValue: any, getValues: any }> = ({ domainsName, register, setValue, getValues }) => {
    const [newDomain, setNewDomain] = useState("");
    const [error, setError] = useState<string | null>(null);

    // Get current domains from form state
    const domains: string[] = getValues(domainsName) || [];

    const isValidUrl = (url: string) => {
        const pattern = new RegExp(
            "^(https?:\\/\\/)?" + // protocol
            "((([a-zA-Z0-9\\-\\.]+)\\.([a-zA-Z]{2,}))|" + // domain
            "localhost|" + // localhost
            "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|" + // IPv4
            "\\[([a-fA-F0-9:]+)\\])" + // IPv6
            "(:\\d+)?(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?$", // port and path
            "i"
        );
        return pattern.test(url);
    };

    const addDomain = () => {
        if (newDomain.trim() === "") {
            setError("Domain cannot be empty");
            return;
        }

        if (!isValidUrl(newDomain)) {
            setError("Invalid URL format");
            return;
        }

        if (domains.includes(newDomain)) {
            setError("Domain already in the list");
            return;
        }

        const updatedDomains = [...domains, newDomain];
        setValue(domainsName, updatedDomains); // Update form state with the new list of domains
        setNewDomain("");
        setError(null);
    };

    const removeDomain = (domainToRemove: string) => {
        const updatedDomains = domains.filter(domain => domain !== domainToRemove);
        setValue(domainsName, updatedDomains); // Update form state after removing a domain
    };

    return (
        <div className="form-control mb-4 relative">
            <label className="text-sm text-white" htmlFor={domainsName}>
                Allowed Domains
            </label>
            <span className="text-xs text-gray-400 block mb-2">
                Add domains that are allowed to make requests using this key.
                You don't have to specify the protocol (http/https), unless you want to restrict the key to a specific protocol.
            </span>
            <div className="flex my-2 items-center z-[1]">
                <label className="input flex items-center w-full bg-white/10 border border-white/15">
                    <input
                        id={domainsName}
                        value={newDomain}
                        onChange={(e) => setNewDomain(e.target.value)}
                        className="grow"
                        placeholder="https://example.com"
                    />
                    <button
                        type="button"
                        className="text-white"
                        onClick={addDomain}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </label>
            </div>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <ul className="list-disc">
                {domains.map((domain, index) => (
                    <li key={index} className="flex items-center mb-1 mx-1 justify-between">
                        <span className="text-white">{domain}</span>
                        <button
                            type="button"
                            className="btn btn-sm text-red-500 p-0 border-none z-[1]"
                            onClick={() => removeDomain(domain)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
