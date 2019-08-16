package com.teamonion.tmong.websocket;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class ConnectedSession {
    private final static Map<String, String> processingSessions = new ConcurrentHashMap<>();

    public ConnectedSession() {

    }

    public void add(String memberId, String sessionId) {
        processingSessions.put(memberId, sessionId);
    }

    public static String get(String memberId) {
        return processingSessions.get(memberId);
    }

    public void remove(String memberId) {
        processingSessions.remove(memberId);
    }
}
