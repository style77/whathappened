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
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Keys</h1>
                    <button className="btn btn-primary" onClick={() => showKeyCreateModal()}>
                        Create Key
                    </button>
                </div>

                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Key</th>
                            <th>Created At</th>
                            <th>Allowed Domains</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableQueryResult.data?.data.map((record) => (
                            <tr key={record.key}>
                                <td>{record.key}</td>
                                <td>{new Date(record.createdAt).toLocaleString()}</td>
                                <td>{record.allowed_domains.join(", ")}</td>
                                <td>
                                    {/* Action buttons */}
                                </td>
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
                            <button className="btn btn-primary" type="submit">
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
            <div className="modal-box">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
                <h2 className="font-bold text-lg">{title}</h2>
                {description && (
                    <h3 className="text-sm text-gray-500 mb-4">{description}</h3>
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
        <div className="form-control mb-4">
            <label className="text-sm" htmlFor={domainsName}>
                Allowed Domains
            </label>
            <span className="text-xs text-gray-500 block mb-2">
                Add domains that are allowed to make requests using this key.
                You don't have to specify the protocol (http/https), unless you want to restrict the key to a specific protocol.
            </span>
            <div className="flex my-2 items-center">
                <input
                    id={domainsName}
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                    className="input input-bordered flex-grow"
                    placeholder="https://example.com"
                />
                <button
                    type="button"
                    className="btn btn-secondary ml-2"
                    onClick={addDomain}
                >
                    Add
                </button>
            </div>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <ul className="list-disc">
                {domains.map((domain, index) => (
                    <li key={index} className="flex items-center mb-1 justify-between">
                        <span>{domain}</span>
                        <button
                            type="button"
                            className="btn btn-sm btn-error p-0"
                            onClick={() => removeDomain(domain)}
                        >
                            <MinusIcon className="w-6 h-auto text-white" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
